// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IBnbToWaterAdapter.sol";
import "./interfaces/IWaterStakingController.sol";

/// @title WATER Staking Vault
/// @notice Permanent ERC-1167 per-user vault. It directly holds the user's WATER and native BNB dividends.
/// @dev The controller can release WATER only to this vault's owner. Native BNB is controlled only by the owner.
///      In an irreversible protocol emergency shutdown, the owner can recover all WATER directly without running
///      reward/expiry accounting. This deliberately prioritizes principal recovery over staking-reward accounting.
contract WaterStakingVault {
    using SafeERC20 for IERC20;

    error AlreadyInitialized();
    error NotOwner();
    error NotController();
    error ZeroAddress();
    error ZeroAmount();
    error AmountExceedsBalance();
    error AdapterNotApproved();
    error SlippageExceeded();
    error NativeTransferFailed();
    error ReentrantCall();
    error WaterRecoveryForbidden();
    error EmergencyShutdownRequired();
    error EmergencyShutdownActive();
    error BnbCompoundingDisabled();

    event BnbClaimed(address indexed owner, uint256 amount);
    event BnbCompounded(address indexed owner, address indexed adapter, uint256 bnbIn, uint256 waterOut);
    event WaterReleased(address indexed owner, uint256 waterAmount);
    event EmergencyWaterExited(address indexed owner, uint256 waterAmount);
    event UnsupportedTokenRecovered(address indexed token, uint256 amount);

    address public owner;
    address public controller;
    IERC20 public water;

    bool private _initialized;
    bool private _entered;

    /// @dev Locks the implementation itself. Clones have independent storage and initialize normally.
    constructor() {
        _initialized = true;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyController() {
        if (msg.sender != controller) revert NotController();
        _;
    }

    modifier nonReentrant() {
        if (_entered) revert ReentrantCall();
        _entered = true;
        _;
        _entered = false;
    }

    function initialize(address owner_, address controller_, address water_) external {
        if (_initialized) revert AlreadyInitialized();
        if (owner_ == address(0) || controller_ == address(0) || water_ == address(0)) {
            revert ZeroAddress();
        }

        _initialized = true;
        owner = owner_;
        controller = controller_;
        water = IERC20(water_);
    }

    /// @notice Minimal native receive path for compatibility with WATER's BNB dividend distributor.
    receive() external payable {}

    /// @notice Controller-authorized WATER release. Destination is hard-coded to the vault owner.
    function releaseWater(uint256 amount) external onlyController nonReentrant {
        if (amount == 0) revert ZeroAmount();
        water.safeTransfer(owner, amount);
        emit WaterReleased(owner, amount);
    }

    /// @notice Catastrophic principal escape. Available only after the controller enters irreversible shutdown.
    /// @dev Transfers every WATER token in this vault to its owner without consulting staking accounting.
    ///      Unclaimed staking rewards in the controller may be forfeited; BNB remains separately claimable.
    function emergencyExitWater() external onlyOwner nonReentrant returns (uint256 exited) {
        if (!IWaterStakingController(controller).emergencyShutdown()) revert EmergencyShutdownRequired();
        exited = water.balanceOf(address(this));
        if (exited == 0) revert ZeroAmount();
        water.safeTransfer(owner, exited);
        emit EmergencyWaterExited(owner, exited);
    }

    /// @notice Claim native BNB dividends. Pass type(uint256).max for the entire BNB balance.
    function claimBNB(uint256 amount) external onlyOwner nonReentrant returns (uint256 claimed) {
        // During normal operation every meaningful interaction synchronizes expiry first.
        // Emergency shutdown deliberately skips controller accounting so BNB can never be trapped by it.
        if (!IWaterStakingController(controller).emergencyShutdown()) {
            IWaterStakingController(controller).syncPosition(owner);
        }

        uint256 balance = address(this).balance;
        claimed = amount == type(uint256).max ? balance : amount;
        if (claimed == 0) revert ZeroAmount();
        if (claimed > balance) revert AmountExceedsBalance();

        (bool ok, ) = payable(owner).call{value: claimed}("");
        if (!ok) revert NativeTransferFailed();
        emit BnbClaimed(owner, claimed);
    }

    /// @notice Convert some/all vault BNB to WATER through an approved adapter and add it to the active stake.
    /// @dev Compounding never resets or extends a live lock.
    function compoundBNB(
        uint256 bnbAmount,
        address adapter,
        uint256 minWaterOut,
        uint256 deadline
    ) external onlyOwner nonReentrant returns (uint256 waterOut) {
        if (IWaterStakingController(controller).emergencyShutdown()) revert EmergencyShutdownActive();
        if (!IWaterStakingController(controller).bnbCompoundingEnabled()) revert BnbCompoundingDisabled();

        // Global daily rollover + user rollover happens before deciding which pool receives compounded WATER.
        IWaterStakingController(controller).syncPosition(owner);

        if (bnbAmount == 0) revert ZeroAmount();
        if (bnbAmount > address(this).balance) revert AmountExceedsBalance();
        if (!IWaterStakingController(controller).isSwapAdapter(adapter)) revert AdapterNotApproved();

        uint256 beforeBalance = water.balanceOf(address(this));
        IBnbToWaterAdapter(adapter).swapExactBNBForWater{value: bnbAmount}(
            address(water),
            minWaterOut,
            address(this),
            deadline
        );

        waterOut = water.balanceOf(address(this)) - beforeBalance;
        if (waterOut == 0) revert ZeroAmount();
        if (waterOut < minWaterOut) revert SlippageExceeded();

        IWaterStakingController(controller).registerBnbCompound(waterOut);
        emit BnbCompounded(owner, adapter, bnbAmount, waterOut);
    }

    /// @notice Recover an unrelated ERC20 accidentally sent to the vault. WATER is deliberately forbidden in normal mode.
    function recoverUnsupportedToken(address token, uint256 amount) external onlyOwner nonReentrant {
        if (token == address(water)) revert WaterRecoveryForbidden();
        IERC20(token).safeTransfer(owner, amount);
        emit UnsupportedTokenRecovered(token, amount);
    }
}
