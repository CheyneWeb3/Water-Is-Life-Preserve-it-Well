// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./WaterStakingVault.sol";

/// @title WATER Dividend-Preserving Staking Controller V2.3
/// @notice Flexible + 30-day Locked staking using permanent per-user ERC-1167 vaults.
///
/// Core rules:
/// - User principal WATER is held by that user's permanent vault, never by this controller.
/// - Flexible and Locked have separate finite, pre-funded WATER reward reserves/emission streams.
/// - No multiplier/weight boost exists. The Locked advantage comes only from its funded reward allocation.
/// - A Locked position is locked for at least 30 days and rolls to Flexible at the next UTC daily epoch boundary.
/// - The first state-changing interaction in a new daily epoch performs aggregate expiry processing for that epoch.
/// - Expiries are aggregated by epoch, so rollover cost is independent of the number of users expiring that day.
/// - Every user interaction then synchronizes only that user's stored position against the global epoch snapshots.
/// - WATER/BNB rewards remain claimable while locked; compounding does not extend the existing lock.
/// - Adding fresh wallet WATER to a live lock restarts the whole position for a new 30-day term.
/// - Irreversible emergency shutdown gives each vault owner a direct principal escape that bypasses accounting.
/// - OWNER/MULTISIG retains high-risk governance; OPERATOR is a separate server/maintenance role.
/// - OPERATOR may sync epochs/positions and control operational feature switches, but never user custody or rewards.
contract WaterStakingController is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint8 public constant FLEXIBLE_POOL = 0;
    uint8 public constant LOCKED_POOL = 1;

    uint64 public constant EPOCH_DURATION = 1 days;
    uint64 public constant LOCK_DURATION = 30 days;
    // ceil(now + 30 days) can be at most currentEpoch + 31.
    uint64 public constant MAX_EXPIRY_LOOKAHEAD_EPOCHS = 31;
    uint64 public constant ADAPTER_CHANGE_DELAY = 1 days;
    uint256 public constant MAX_MAINTENANCE_ACCOUNTS = 100;

    uint8 public constant FEATURE_FLEXIBLE_STAKING = 0;
    uint8 public constant FEATURE_LOCKED_STAKING = 1;
    uint8 public constant FEATURE_RELOCK = 2;
    uint8 public constant FEATURE_WATER_COMPOUNDING = 3;
    uint8 public constant FEATURE_BNB_COMPOUNDING = 4;

    uint256 public constant REWARD_PRECISION = 1e24;

    error ZeroAddress();
    error ZeroAmount();
    error InvalidDuration();
    error InvalidPool();
    error NoActivePosition();
    error PositionLocked(uint256 unlockAt);
    error PositionAlreadyLocked(uint256 unlockAt);
    error RewardAmountExceeded();
    error AmountExceedsStake();
    error InsufficientRewardBudget();
    error UnknownVault();
    error InvalidVaultBalance();
    error WaterRecoveryForbidden();
    error NativeTransferFailed();
    error EpochAccountingInvariant();
    error RewardAccountingInvariant();
    error EmergencyShutdownActive();
    error EmergencyShutdownAlreadyActive();
    error AdapterChangeNotProposed();
    error AdapterChangeNotReady(uint256 executeAfter);
    error AdapterChangeAlreadyPending();
    error NoExcessWater();
    error NotOperatorOrOwner();
    error InvalidFeature();
    error FeatureDisabled(uint8 featureId);
    error TooManyMaintenanceAccounts(uint256 supplied, uint256 maximum);

    struct RewardPool {
        uint64 periodFinish;
        uint64 lastUpdateTime;
        uint256 rewardRate; // WATER per second
        uint256 rewardPerTokenStored;
        uint256 totalStaked; // economic stake currently earning this pool
        uint256 budget; // WATER assigned to this pool and still held by the controller
        uint256 accruedLiability; // emitted WATER owed but not yet claimed/compounded
    }

    struct Position {
        bool initialized;
        uint8 poolId; // may remain LOCKED in storage after global rollover until this user is synchronized
        uint64 unlockEpoch;
        uint256 amount;
        uint256 accruedFlexibleWater;
        uint256 accruedLockedWater;
        uint256 userRewardPerTokenPaid;
    }

    struct ExpirySnapshot {
        bool processed;
        uint256 flexibleRewardPerToken;
        uint256 lockedRewardPerToken;
    }

    struct PendingAdapterChange {
        bool exists;
        bool approved;
        uint64 executeAfter;
    }

    struct AccountView {
        address vault;
        uint8 storedPoolId;
        uint8 effectivePoolId;
        uint64 unlockEpoch;
        uint64 unlockAt;
        bool lockActive;
        bool rolloverPending;
        bool globalEpochSyncPending;
        uint256 stakedWater;
        uint256 claimableFlexibleWater;
        uint256 claimableLockedWater;
        uint256 claimableWater;
        uint256 vaultBnbBalance;
    }

    struct PoolPreview {
        uint64 periodFinish;
        uint64 lastUpdateTime;
        uint256 rewardRate;
        uint256 rewardPerTokenStored;
        uint256 totalStaked;
        uint256 accruedLiability;
    }

    struct GlobalPreview {
        PoolPreview flexible;
        PoolPreview locked;
        bool wantedExpiryFound;
        uint256 flexibleAtWantedExpiry;
        uint256 lockedAtWantedExpiry;
    }

    IERC20 public immutable water;
    address public immutable vaultImplementation;

    /// @notice Routine server/automation role. It has no user-custody authority.
    address public operator;

    bool public flexibleStakingEnabled = true;
    bool public lockedStakingEnabled = true;
    bool public relockEnabled = true;
    bool public waterCompoundingEnabled = true;
    bool public bnbCompoundingEnabled = true;

    mapping(uint8 => RewardPool) public rewardPools;
    mapping(address => Position) public positions;

    mapping(address => address) public vaultOf;
    mapping(address => address) public ownerOfVault;

    /// @notice Aggregate Locked principal scheduled to become Flexible at a daily epoch boundary.
    mapping(uint64 => uint256) public expiringLockedByEpoch;
    /// @notice Reward-per-token checkpoints at each processed expiry epoch; retained for lazy user settlement.
    mapping(uint64 => ExpirySnapshot) public expirySnapshots;

    mapping(address => bool) public isSwapAdapter;
    mapping(address => PendingAdapterChange) public pendingAdapterChanges;

    uint64 public lastProcessedEpoch;
    uint256 public totalStakedWater;
    bool public emergencyShutdown;

    event VaultCreated(address indexed owner, address indexed vault);
    event RewardsFunded(uint8 indexed poolId, uint256 requested, uint256 received);
    event RewardsScheduled(uint8 indexed poolId, uint256 rewardRate, uint64 periodFinish, uint256 scheduledBudget);

    event AdapterChangeProposed(address indexed adapter, bool approved, uint64 executeAfter);
    event AdapterChangeCancelled(address indexed adapter);
    event SwapAdapterUpdated(address indexed adapter, bool approved);

    event EmergencyShutdownActivated(address indexed by);
    event StakingPaused(address indexed by);
    event StakingUnpaused(address indexed by);

    event GlobalEpochSynced(uint64 indexed previousEpoch, uint64 indexed currentEpoch, uint256 boundariesProcessed);
    event LockedEpochRolledToFlexible(
        uint64 indexed expiryEpoch,
        uint64 indexed boundaryTimestamp,
        uint256 amount
    );

    event FlexibleStaked(address indexed owner, address indexed vault, uint256 requested, uint256 received);
    event LockedStaked(
        address indexed owner,
        address indexed vault,
        uint256 requested,
        uint256 received,
        uint64 unlockEpoch,
        uint64 unlockAt
    );
    event PositionLockedFor30Days(address indexed owner, uint256 amount, uint64 unlockEpoch, uint64 unlockAt);
    event LockRestarted(
        address indexed owner,
        uint256 newLockedAmount,
        uint64 oldUnlockEpoch,
        uint64 newUnlockEpoch,
        uint64 newUnlockAt
    );
    event PositionRolledToFlexible(address indexed owner, uint64 indexed expiryEpoch, uint256 amount);

    event WaterClaimed(address indexed owner, uint256 debitedReward, uint256 actualReceived);
    event WaterCompounded(address indexed owner, uint8 indexed poolId, uint256 rewardDebited, uint256 waterAdded);
    event BnbCompoundedIntoWater(address indexed owner, address indexed vault, uint8 indexed poolId, uint256 waterAdded);
    event Withdrawn(address indexed owner, address indexed vault, uint8 indexed poolId, uint256 amount);

    event UnaccountedWaterRecovered(address indexed owner, address indexed vault, uint256 amount);
    event ExcessControllerWaterRecovered(address indexed to, uint256 amount);
    event UnsupportedTokenRecovered(address indexed token, address indexed to, uint256 amount);
    event NativeRecovered(address indexed to, uint256 amount);

    event OperatorUpdated(address indexed previousOperator, address indexed newOperator, address indexed by);
    event FeatureUpdated(uint8 indexed featureId, bool enabled, address indexed by);
    event MaintenanceRun(
        address indexed caller,
        uint64 indexed epoch,
        uint256 boundariesProcessed,
        uint256 accountsRequested,
        uint256 positionsRolled
    );

    modifier onlyOperatorOrOwner() {
        if (msg.sender != owner() && msg.sender != operator) revert NotOperatorOrOwner();
        _;
    }

    modifier whenOperational() {
        if (emergencyShutdown) revert EmergencyShutdownActive();
        _;
    }

    constructor(address water_, address operator_) {
        if (water_ == address(0)) revert ZeroAddress();
        water = IERC20(water_);
        operator = operator_ == address(0) ? msg.sender : operator_;
        vaultImplementation = address(new WaterStakingVault());

        uint64 now_ = uint64(block.timestamp);
        uint64 epoch_ = _epochOf(block.timestamp);
        lastProcessedEpoch = epoch_;
        rewardPools[FLEXIBLE_POOL].lastUpdateTime = now_;
        rewardPools[LOCKED_POOL].lastUpdateTime = now_;

        emit OperatorUpdated(address(0), operator, msg.sender);
    }

    /// @notice The controller may itself receive BNB if its pre-funded WATER reserve participates in WATER dividends.
    /// @dev Production integration should normally exclude the reward controller from WATER dividends.
    receive() external payable {}

    // ---------------------------------------------------------------------
    // Epoch helpers / synchronization
    // ---------------------------------------------------------------------

    function currentEpoch() public view returns (uint64) {
        return _epochOf(block.timestamp);
    }

    function epochStart(uint64 epoch) public pure returns (uint64) {
        return uint64(uint256(epoch) * uint256(EPOCH_DURATION));
    }

    /// @notice Calculates the daily epoch at which a fresh lock becomes Flexible.
    /// @dev Rounds `now + 30 days` UP to the next daily boundary, so a lock is never shorter than 30 days.
    function nextLockExpiryEpoch() public view returns (uint64) {
        return _expiryEpochForTimestamp(block.timestamp);
    }

    function nextLockUnlockAt() external view returns (uint64) {
        return epochStart(nextLockExpiryEpoch());
    }

    /// @notice Permissionlessly process any daily expiry boundary due since the last interaction.
    /// @dev The first state-changing interaction of a new epoch pays this work automatically.
    function syncGlobalEpoch() external nonReentrant whenOperational returns (uint256 boundariesProcessed) {
        boundariesProcessed = _syncGlobal();
    }

    /// @notice Permissionlessly synchronize global epoch accounting and then one user's lazy position state.
    function syncPosition(address account)
        external
        nonReentrant
        whenOperational
        returns (bool rolledToFlexible)
    {
        _syncGlobal();
        rolledToFlexible = _syncPosition(account);
    }

    // ---------------------------------------------------------------------
    // Operator / server maintenance controls
    // ---------------------------------------------------------------------

    /// @notice OWNER/MULTISIG appoints the routine server operator. Zero address disables the operator role.
    function setOperator(address newOperator) external onlyOwner {
        address previous = operator;
        operator = newOperator;
        emit OperatorUpdated(previous, newOperator, msg.sender);
    }

    /// @notice Enable/disable routine entry features. Claims, withdrawals, expiry rollover and emergency exits are never feature-gated.
    function setFeatureEnabled(uint8 featureId, bool enabled) external onlyOperatorOrOwner whenOperational {
        if (featureId == FEATURE_FLEXIBLE_STAKING) {
            flexibleStakingEnabled = enabled;
        } else if (featureId == FEATURE_LOCKED_STAKING) {
            lockedStakingEnabled = enabled;
        } else if (featureId == FEATURE_RELOCK) {
            relockEnabled = enabled;
        } else if (featureId == FEATURE_WATER_COMPOUNDING) {
            waterCompoundingEnabled = enabled;
        } else if (featureId == FEATURE_BNB_COMPOUNDING) {
            bnbCompoundingEnabled = enabled;
        } else {
            revert InvalidFeature();
        }
        emit FeatureUpdated(featureId, enabled, msg.sender);
    }

    /// @notice Server-friendly maintenance call: process the daily global epoch once, then lazily settle a bounded set of users.
    /// @dev This function cannot transfer user WATER/BNB or claim rewards. Empty/uninitialized accounts are harmless.
    function runMaintenance(address[] calldata accounts)
        external
        onlyOperatorOrOwner
        nonReentrant
        whenOperational
        returns (uint256 boundariesProcessed, uint256 positionsRolled)
    {
        uint256 length = accounts.length;
        if (length > MAX_MAINTENANCE_ACCOUNTS) {
            revert TooManyMaintenanceAccounts(length, MAX_MAINTENANCE_ACCOUNTS);
        }

        boundariesProcessed = _syncGlobal();
        for (uint256 i = 0; i < length; ++i) {
            if (_syncPosition(accounts[i])) positionsRolled += 1;
        }

        emit MaintenanceRun(msg.sender, currentEpoch(), boundariesProcessed, length, positionsRolled);
    }

    // ---------------------------------------------------------------------
    // Vault lifecycle
    // ---------------------------------------------------------------------

    function vaultSalt(address account) public pure returns (bytes32) {
        return keccak256(abi.encode(account));
    }

    function predictVault(address account) public view returns (address) {
        return Clones.predictDeterministicAddress(vaultImplementation, vaultSalt(account), address(this));
    }

    function createVault() external whenOperational returns (address vault) {
        vault = _getOrCreateVault(msg.sender);
    }

    function _getOrCreateVault(address account) internal returns (address vault) {
        vault = vaultOf[account];
        if (vault != address(0)) return vault;

        vault = Clones.cloneDeterministic(vaultImplementation, vaultSalt(account));
        WaterStakingVault(payable(vault)).initialize(account, address(this), address(water));
        vaultOf[account] = vault;
        ownerOfVault[vault] = account;
        emit VaultCreated(account, vault);
    }

    // ---------------------------------------------------------------------
    // Reward reserves / emissions
    // ---------------------------------------------------------------------

    /// @notice Fund either the Flexible or Locked finite WATER reward reserve.
    /// @dev A 35/65, 40/60, etc. split is simply achieved by funding the pools with those token amounts.
    function fundRewards(uint8 poolId, uint256 amount)
        external
        onlyOwner
        nonReentrant
        whenOperational
        returns (uint256 received)
    {
        _validatePool(poolId);
        if (amount == 0) revert ZeroAmount();
        _syncGlobal();

        uint256 beforeBalance = water.balanceOf(address(this));
        water.safeTransferFrom(msg.sender, address(this), amount);
        received = water.balanceOf(address(this)) - beforeBalance;
        if (received == 0) revert ZeroAmount();

        rewardPools[poolId].budget += received;
        emit RewardsFunded(poolId, amount, received);
    }

    /// @notice Schedule all currently non-liability WATER in one pool across `duration` seconds.
    function scheduleRewards(uint8 poolId, uint64 duration)
        external
        onlyOwner
        nonReentrant
        whenOperational
    {
        _validatePool(poolId);
        if (duration == 0) revert InvalidDuration();
        _syncGlobal();

        RewardPool storage pool = rewardPools[poolId];
        if (pool.budget < pool.accruedLiability) revert RewardAccountingInvariant();
        uint256 available = pool.budget - pool.accruedLiability;
        if (available == 0) revert InsufficientRewardBudget();

        uint256 rate = available / duration;
        if (rate == 0) revert InsufficientRewardBudget();

        pool.rewardRate = rate;
        pool.lastUpdateTime = uint64(block.timestamp);
        pool.periodFinish = uint64(block.timestamp + duration);
        emit RewardsScheduled(poolId, rate, pool.periodFinish, available);
    }

    function currentRewardPerToken(uint8 poolId) public view returns (uint256) {
        _validatePool(poolId);
        GlobalPreview memory preview = _previewGlobal(0);
        return poolId == FLEXIBLE_POOL
            ? preview.flexible.rewardPerTokenStored
            : preview.locked.rewardPerTokenStored;
    }

    function unallocatedRewardBudget(uint8 poolId) external view returns (uint256) {
        _validatePool(poolId);
        GlobalPreview memory preview = _previewGlobal(0);
        uint256 liability = poolId == FLEXIBLE_POOL
            ? preview.flexible.accruedLiability
            : preview.locked.accruedLiability;
        uint256 budget = rewardPools[poolId].budget;
        return budget > liability ? budget - liability : 0;
    }

    function rewardReserveRequired() public view returns (uint256) {
        return rewardPools[FLEXIBLE_POOL].budget + rewardPools[LOCKED_POOL].budget;
    }

    function rewardReserveSolvent() external view returns (bool) {
        return water.balanceOf(address(this)) >= rewardReserveRequired();
    }

    // ---------------------------------------------------------------------
    // User staking
    // ---------------------------------------------------------------------

    /// @notice Add fresh wallet WATER to Flexible. A live Locked position cannot be split into Flexible.
    function stakeFlexible(uint256 amount)
        external
        whenNotPaused
        nonReentrant
        whenOperational
        returns (uint256 received)
    {
        if (!flexibleStakingEnabled) revert FeatureDisabled(FEATURE_FLEXIBLE_STAKING);
        if (amount == 0) revert ZeroAmount();
        _prepareAccount(msg.sender);

        Position storage position = positions[msg.sender];
        if (position.initialized && position.amount != 0 && position.poolId == LOCKED_POOL) {
            revert PositionLocked(epochStart(position.unlockEpoch));
        }

        address vault = _getOrCreateVault(msg.sender);
        received = _transferFreshWaterToVault(msg.sender, vault, amount);

        if (!position.initialized) {
            position.initialized = true;
            position.poolId = FLEXIBLE_POOL;
            position.userRewardPerTokenPaid = rewardPools[FLEXIBLE_POOL].rewardPerTokenStored;
        }

        position.amount += received;
        rewardPools[FLEXIBLE_POOL].totalStaked += received;
        totalStakedWater += received;

        emit FlexibleStaked(msg.sender, vault, amount, received);
    }

    /// @notice Add fresh wallet WATER to the Locked pool.
    /// @dev A fresh top-up while already locked restarts the WHOLE position. Compounding never does.
    function stakeLocked(uint256 amount)
        external
        whenNotPaused
        nonReentrant
        whenOperational
        returns (uint256 received, uint64 unlockAt)
    {
        if (!lockedStakingEnabled) revert FeatureDisabled(FEATURE_LOCKED_STAKING);
        if (amount == 0) revert ZeroAmount();
        _prepareAccount(msg.sender);

        address vault = _getOrCreateVault(msg.sender);
        received = _transferFreshWaterToVault(msg.sender, vault, amount);

        Position storage position = positions[msg.sender];
        uint256 oldAmount = position.initialized ? position.amount : 0;
        uint64 newExpiryEpoch = _expiryEpochForTimestamp(block.timestamp);
        unlockAt = epochStart(newExpiryEpoch);

        if (!position.initialized) {
            position.initialized = true;
            position.poolId = LOCKED_POOL;
            position.amount = received;
            position.unlockEpoch = newExpiryEpoch;
            position.userRewardPerTokenPaid = rewardPools[LOCKED_POOL].rewardPerTokenStored;

            rewardPools[LOCKED_POOL].totalStaked += received;
            totalStakedWater += received;
            expiringLockedByEpoch[newExpiryEpoch] += received;
        } else if (position.poolId == FLEXIBLE_POOL) {
            if (rewardPools[FLEXIBLE_POOL].totalStaked < oldAmount) revert EpochAccountingInvariant();
            rewardPools[FLEXIBLE_POOL].totalStaked -= oldAmount;

            position.amount = oldAmount + received;
            position.poolId = LOCKED_POOL;
            position.unlockEpoch = newExpiryEpoch;
            position.userRewardPerTokenPaid = rewardPools[LOCKED_POOL].rewardPerTokenStored;

            rewardPools[LOCKED_POOL].totalStaked += position.amount;
            totalStakedWater += received;
            expiringLockedByEpoch[newExpiryEpoch] += position.amount;
        } else {
            uint64 oldExpiryEpoch = position.unlockEpoch;
            if (expiringLockedByEpoch[oldExpiryEpoch] < oldAmount) revert EpochAccountingInvariant();
            expiringLockedByEpoch[oldExpiryEpoch] -= oldAmount;

            position.amount = oldAmount + received;
            position.unlockEpoch = newExpiryEpoch;
            rewardPools[LOCKED_POOL].totalStaked += received;
            totalStakedWater += received;
            expiringLockedByEpoch[newExpiryEpoch] += position.amount;

            emit LockRestarted(msg.sender, position.amount, oldExpiryEpoch, newExpiryEpoch, unlockAt);
        }

        emit LockedStaked(msg.sender, vault, amount, received, newExpiryEpoch, unlockAt);
    }

    /// @notice Move the user's entire Flexible principal into a new 30-day lock without transferring WATER.
    function relock()
        external
        whenNotPaused
        nonReentrant
        whenOperational
        returns (uint64 unlockAt)
    {
        if (!relockEnabled) revert FeatureDisabled(FEATURE_RELOCK);
        _prepareAccount(msg.sender);
        Position storage position = positions[msg.sender];
        if (!position.initialized || position.amount == 0) revert NoActivePosition();
        if (position.poolId != FLEXIBLE_POOL) revert PositionAlreadyLocked(epochStart(position.unlockEpoch));

        uint256 amount = position.amount;
        if (rewardPools[FLEXIBLE_POOL].totalStaked < amount) revert EpochAccountingInvariant();
        rewardPools[FLEXIBLE_POOL].totalStaked -= amount;
        rewardPools[LOCKED_POOL].totalStaked += amount;

        position.poolId = LOCKED_POOL;
        position.userRewardPerTokenPaid = rewardPools[LOCKED_POOL].rewardPerTokenStored;
        position.unlockEpoch = _expiryEpochForTimestamp(block.timestamp);
        expiringLockedByEpoch[position.unlockEpoch] += amount;
        unlockAt = epochStart(position.unlockEpoch);

        emit PositionLockedFor30Days(msg.sender, amount, position.unlockEpoch, unlockAt);
    }

    /// @notice Withdraw Flexible principal. A matured Locked position is synchronized to Flexible first.
    function withdraw(uint256 amount)
        external
        nonReentrant
        whenOperational
        returns (uint256 withdrawn)
    {
        _prepareAccount(msg.sender);
        Position storage position = positions[msg.sender];
        if (!position.initialized || position.amount == 0) revert NoActivePosition();
        if (position.poolId == LOCKED_POOL) revert PositionLocked(epochStart(position.unlockEpoch));

        withdrawn = amount == type(uint256).max ? position.amount : amount;
        if (withdrawn == 0) revert ZeroAmount();
        if (withdrawn > position.amount) revert AmountExceedsStake();

        if (rewardPools[FLEXIBLE_POOL].totalStaked < withdrawn) revert EpochAccountingInvariant();
        rewardPools[FLEXIBLE_POOL].totalStaked -= withdrawn;
        position.amount -= withdrawn;
        totalStakedWater -= withdrawn;

        address vault = vaultOf[msg.sender];
        WaterStakingVault(payable(vault)).releaseWater(withdrawn);
        emit Withdrawn(msg.sender, vault, FLEXIBLE_POOL, withdrawn);
    }

    // ---------------------------------------------------------------------
    // WATER reward claims / compounding
    // ---------------------------------------------------------------------

    /// @notice Claim some/all accrued WATER rewards while keeping principal unchanged.
    function claimWater(uint256 amount)
        external
        nonReentrant
        whenOperational
        returns (uint256 debited, uint256 received)
    {
        _prepareAccount(msg.sender);
        Position storage position = positions[msg.sender];
        if (!position.initialized) revert NoActivePosition();

        uint256 available = position.accruedFlexibleWater + position.accruedLockedWater;
        debited = amount == type(uint256).max ? available : amount;
        if (debited == 0) revert ZeroAmount();
        if (debited > available) revert RewardAmountExceeded();

        _debitAccruedRewards(position, debited);

        uint256 beforeBalance = water.balanceOf(msg.sender);
        water.safeTransfer(msg.sender, debited);
        received = water.balanceOf(msg.sender) - beforeBalance;
        emit WaterClaimed(msg.sender, debited, received);
    }

    /// @notice Compound some/all accrued WATER rewards into the current position.
    /// @dev Compounded WATER inherits a live lock's existing expiry and NEVER extends it.
    function compoundWater(uint256 amount)
        external
        whenNotPaused
        nonReentrant
        whenOperational
        returns (uint256 debited, uint256 waterAdded)
    {
        if (!waterCompoundingEnabled) revert FeatureDisabled(FEATURE_WATER_COMPOUNDING);
        _prepareAccount(msg.sender);
        Position storage position = positions[msg.sender];
        if (!position.initialized) revert NoActivePosition();

        uint256 available = position.accruedFlexibleWater + position.accruedLockedWater;
        debited = amount == type(uint256).max ? available : amount;
        if (debited == 0) revert ZeroAmount();
        if (debited > available) revert RewardAmountExceeded();

        _debitAccruedRewards(position, debited);
        address vault = _getOrCreateVault(msg.sender);
        uint256 beforeBalance = water.balanceOf(vault);
        water.safeTransfer(vault, debited);
        waterAdded = water.balanceOf(vault) - beforeBalance;
        if (waterAdded == 0) revert ZeroAmount();

        _increaseCurrentPosition(position, waterAdded);
        emit WaterCompounded(msg.sender, position.poolId, debited, waterAdded);
    }

    /// @notice Called only by a registered user vault after it swaps native BNB into WATER.
    function registerBnbCompound(uint256 waterAmount)
        external
        whenNotPaused
        nonReentrant
        whenOperational
    {
        if (!bnbCompoundingEnabled) revert FeatureDisabled(FEATURE_BNB_COMPOUNDING);
        address account = ownerOfVault[msg.sender];
        if (account == address(0) || vaultOf[account] != msg.sender) revert UnknownVault();
        if (waterAmount == 0) revert ZeroAmount();

        _prepareAccount(account);
        Position storage position = positions[account];
        if (!position.initialized) revert NoActivePosition();

        uint256 vaultBalance = water.balanceOf(msg.sender);
        if (vaultBalance < position.amount + waterAmount) revert InvalidVaultBalance();

        _increaseCurrentPosition(position, waterAmount);
        emit BnbCompoundedIntoWater(account, msg.sender, position.poolId, waterAmount);
    }

    // ---------------------------------------------------------------------
    // Views
    // ---------------------------------------------------------------------

    function earnedWater(address account)
        public
        view
        returns (uint256 flexibleAmount, uint256 lockedAmount, uint256 totalAmount)
    {
        Position storage position = positions[account];
        if (!position.initialized) return (0, 0, 0);

        flexibleAmount = position.accruedFlexibleWater;
        lockedAmount = position.accruedLockedWater;
        if (position.amount == 0) return (flexibleAmount, lockedAmount, flexibleAmount + lockedAmount);

        GlobalPreview memory preview = _previewGlobal(
            position.poolId == LOCKED_POOL ? position.unlockEpoch : 0
        );

        if (position.poolId == FLEXIBLE_POOL) {
            uint256 delta = preview.flexible.rewardPerTokenStored - position.userRewardPerTokenPaid;
            flexibleAmount += (position.amount * delta) / REWARD_PRECISION;
        } else if (currentEpoch() < position.unlockEpoch) {
            uint256 delta = preview.locked.rewardPerTokenStored - position.userRewardPerTokenPaid;
            lockedAmount += (position.amount * delta) / REWARD_PRECISION;
        } else {
            uint256 flexibleAtExpiry;
            uint256 lockedAtExpiry;

            if (position.unlockEpoch <= lastProcessedEpoch) {
                ExpirySnapshot storage snapshot = expirySnapshots[position.unlockEpoch];
                if (!snapshot.processed) revert EpochAccountingInvariant();
                flexibleAtExpiry = snapshot.flexibleRewardPerToken;
                lockedAtExpiry = snapshot.lockedRewardPerToken;
            } else {
                if (!preview.wantedExpiryFound) revert EpochAccountingInvariant();
                flexibleAtExpiry = preview.flexibleAtWantedExpiry;
                lockedAtExpiry = preview.lockedAtWantedExpiry;
            }

            lockedAmount +=
                (position.amount * (lockedAtExpiry - position.userRewardPerTokenPaid)) /
                REWARD_PRECISION;
            flexibleAmount +=
                (position.amount * (preview.flexible.rewardPerTokenStored - flexibleAtExpiry)) /
                REWARD_PRECISION;
        }

        totalAmount = flexibleAmount + lockedAmount;
    }

    function accountView(address account) external view returns (AccountView memory view_) {
        Position storage position = positions[account];
        address vault = vaultOf[account];
        (uint256 flexEarned, uint256 lockEarned, uint256 totalEarned) = earnedWater(account);

        bool maturedStoredLock =
            position.initialized &&
            position.amount != 0 &&
            position.poolId == LOCKED_POOL &&
            currentEpoch() >= position.unlockEpoch;

        view_.vault = vault;
        view_.storedPoolId = position.poolId;
        view_.effectivePoolId = maturedStoredLock ? FLEXIBLE_POOL : position.poolId;
        view_.unlockEpoch = position.poolId == LOCKED_POOL ? position.unlockEpoch : 0;
        view_.unlockAt = position.poolId == LOCKED_POOL ? epochStart(position.unlockEpoch) : 0;
        view_.lockActive =
            position.poolId == LOCKED_POOL &&
            position.amount != 0 &&
            block.timestamp < epochStart(position.unlockEpoch);
        view_.rolloverPending = maturedStoredLock;
        view_.globalEpochSyncPending = currentEpoch() > lastProcessedEpoch;
        view_.stakedWater = position.amount;
        view_.claimableFlexibleWater = flexEarned;
        view_.claimableLockedWater = lockEarned;
        view_.claimableWater = totalEarned;
        view_.vaultBnbBalance = vault == address(0) ? 0 : vault.balance;
    }

    // ---------------------------------------------------------------------
    // Admin / integration controls
    // ---------------------------------------------------------------------

    /// @notice Queue an adapter approval/revocation. It cannot execute until the fixed delay has passed.
    function proposeSwapAdapter(address adapter, bool approved) external onlyOwner whenOperational {
        if (adapter == address(0)) revert ZeroAddress();
        if (pendingAdapterChanges[adapter].exists) revert AdapterChangeAlreadyPending();

        uint64 executeAfter = uint64(block.timestamp + ADAPTER_CHANGE_DELAY);
        pendingAdapterChanges[adapter] = PendingAdapterChange({
            exists: true,
            approved: approved,
            executeAfter: executeAfter
        });
        emit AdapterChangeProposed(adapter, approved, executeAfter);
    }

    function cancelSwapAdapterChange(address adapter) external onlyOwner whenOperational {
        if (!pendingAdapterChanges[adapter].exists) revert AdapterChangeNotProposed();
        delete pendingAdapterChanges[adapter];
        emit AdapterChangeCancelled(adapter);
    }

    function executeSwapAdapterChange(address adapter) external whenOperational {
        PendingAdapterChange memory pending = pendingAdapterChanges[adapter];
        if (!pending.exists) revert AdapterChangeNotProposed();
        if (block.timestamp < pending.executeAfter) revert AdapterChangeNotReady(pending.executeAfter);

        delete pendingAdapterChanges[adapter];
        isSwapAdapter[adapter] = pending.approved;
        emit SwapAdapterUpdated(adapter, pending.approved);
    }

    /// @notice Irreversible shutdown. Normal controller accounting stops and vault owners gain direct WATER exit.
    /// @dev Intended only for catastrophic accounting/integration failure. Cannot be undone.
    function activateEmergencyShutdown() external onlyOwner {
        if (emergencyShutdown) revert EmergencyShutdownAlreadyActive();
        emergencyShutdown = true;
        if (!paused()) {
            _pause();
            emit StakingPaused(msg.sender);
        }
        emit EmergencyShutdownActivated(msg.sender);
    }

    function pauseStaking() external onlyOperatorOrOwner whenOperational {
        _pause();
        emit StakingPaused(msg.sender);
    }

    function unpauseStaking() external onlyOperatorOrOwner whenOperational {
        _unpause();
        emit StakingUnpaused(msg.sender);
    }

    /// @notice Recover WATER accidentally sent directly to a vault above its accounted principal.
    function recoverUnaccountedWater(uint256 amount)
        external
        nonReentrant
        whenOperational
        returns (uint256 recovered)
    {
        _prepareAccount(msg.sender);
        address vault = vaultOf[msg.sender];
        if (vault == address(0)) revert UnknownVault();

        uint256 accounted = positions[msg.sender].initialized ? positions[msg.sender].amount : 0;
        uint256 balance = water.balanceOf(vault);
        if (balance <= accounted) revert ZeroAmount();
        uint256 excess = balance - accounted;
        recovered = amount == type(uint256).max ? excess : amount;
        if (recovered == 0) revert ZeroAmount();
        if (recovered > excess) revert AmountExceedsStake();

        WaterStakingVault(payable(vault)).releaseWater(recovered);
        emit UnaccountedWaterRecovered(msg.sender, vault, recovered);
    }

    /// @notice Recover only WATER that is truly above the sum of both funded reward reserves.
    function recoverExcessControllerWater(address to, uint256 amount)
        external
        onlyOwner
        nonReentrant
        whenOperational
        returns (uint256 recovered)
    {
        if (to == address(0)) revert ZeroAddress();
        uint256 required = rewardReserveRequired();
        uint256 balance = water.balanceOf(address(this));
        if (balance <= required) revert NoExcessWater();

        uint256 excess = balance - required;
        recovered = amount == type(uint256).max ? excess : amount;
        if (recovered == 0 || recovered > excess) revert NoExcessWater();
        water.safeTransfer(to, recovered);
        emit ExcessControllerWaterRecovered(to, recovered);
    }

    function recoverUnsupportedToken(address token, address to, uint256 amount)
        external
        onlyOwner
        nonReentrant
    {
        if (token == address(water)) revert WaterRecoveryForbidden();
        if (to == address(0)) revert ZeroAddress();
        IERC20(token).safeTransfer(to, amount);
        emit UnsupportedTokenRecovered(token, to, amount);
    }

    function recoverNative(address payable to, uint256 amount) external onlyOwner nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        uint256 sendAmount = amount == type(uint256).max ? address(this).balance : amount;
        if (sendAmount == 0) revert ZeroAmount();
        (bool ok, ) = to.call{value: sendAmount}("");
        if (!ok) revert NativeTransferFailed();
        emit NativeRecovered(to, sendAmount);
    }

    // ---------------------------------------------------------------------
    // Internal accounting
    // ---------------------------------------------------------------------

    function _prepareAccount(address account) internal {
        _syncGlobal();
        _syncPosition(account);
    }

    /// @dev Processes aggregate daily rollover before any per-user settlement. At most 31 expiry boundaries
    ///      can be relevant after a period with no interactions because every lock is created with <=31 epochs
    ///      of look-ahead and creating/restarting a lock itself synchronizes the current epoch first.
    function _syncGlobal() internal returns (uint256 boundariesProcessed) {
        uint64 current = _epochOf(block.timestamp);
        uint64 previous = lastProcessedEpoch;

        if (current > previous && rewardPools[LOCKED_POOL].totalStaked != 0) {
            uint64 cursor = previous;
            uint256 maxSteps = uint256(MAX_EXPIRY_LOOKAHEAD_EPOCHS);

            while (cursor < current && boundariesProcessed < maxSteps) {
                cursor += 1;
                uint256 expiring = expiringLockedByEpoch[cursor];

                // Only an epoch that actually changes denominators needs a reward checkpoint at its boundary.
                // Empty days cost one mapping read rather than two full reward-pool writes.
                if (expiring != 0) {
                    uint64 boundary = epochStart(cursor);
                    _updateBothTo(boundary);

                    RewardPool storage locked = rewardPools[LOCKED_POOL];
                    RewardPool storage flexible = rewardPools[FLEXIBLE_POOL];
                    if (locked.totalStaked < expiring) revert EpochAccountingInvariant();

                    expirySnapshots[cursor] = ExpirySnapshot({
                        processed: true,
                        flexibleRewardPerToken: flexible.rewardPerTokenStored,
                        lockedRewardPerToken: locked.rewardPerTokenStored
                    });

                    locked.totalStaked -= expiring;
                    flexible.totalStaked += expiring;
                    delete expiringLockedByEpoch[cursor];

                    emit LockedEpochRolledToFlexible(cursor, boundary, expiring);
                }

                boundariesProcessed += 1;
                if (rewardPools[LOCKED_POOL].totalStaked == 0) break;
            }

            // If there has been no interaction for longer than the full possible lock horizon,
            // every lock that existed at `previous` must have expired by now.
            if (cursor < current && rewardPools[LOCKED_POOL].totalStaked != 0) {
                revert EpochAccountingInvariant();
            }
        }

        if (current > previous) {
            lastProcessedEpoch = current;
            emit GlobalEpochSynced(previous, current, boundariesProcessed);
        }

        _updateBothTo(block.timestamp);
    }

    function _syncPosition(address account) internal returns (bool rolledToFlexible) {
        Position storage position = positions[account];
        if (!position.initialized) return false;

        if (position.amount == 0) {
            RewardPool storage emptyPool = rewardPools[position.poolId];
            position.userRewardPerTokenPaid = emptyPool.rewardPerTokenStored;
            return false;
        }

        if (position.poolId == FLEXIBLE_POOL) {
            RewardPool storage flexible = rewardPools[FLEXIBLE_POOL];
            uint256 delta = flexible.rewardPerTokenStored - position.userRewardPerTokenPaid;
            if (delta != 0) {
                position.accruedFlexibleWater += (position.amount * delta) / REWARD_PRECISION;
            }
            position.userRewardPerTokenPaid = flexible.rewardPerTokenStored;
            return false;
        }

        // Still within the lock epoch: settle only Locked rewards to this block.
        if (_epochOf(block.timestamp) < position.unlockEpoch) {
            RewardPool storage lockedCurrent = rewardPools[LOCKED_POOL];
            uint256 delta = lockedCurrent.rewardPerTokenStored - position.userRewardPerTokenPaid;
            if (delta != 0) {
                position.accruedLockedWater += (position.amount * delta) / REWARD_PRECISION;
            }
            position.userRewardPerTokenPaid = lockedCurrent.rewardPerTokenStored;
            return false;
        }

        // The aggregate amount was already moved Locked -> Flexible at this user's daily expiry boundary.
        ExpirySnapshot storage snapshot = expirySnapshots[position.unlockEpoch];
        if (!snapshot.processed) revert EpochAccountingInvariant();

        uint256 lockedDelta = snapshot.lockedRewardPerToken - position.userRewardPerTokenPaid;
        if (lockedDelta != 0) {
            position.accruedLockedWater += (position.amount * lockedDelta) / REWARD_PRECISION;
        }

        RewardPool storage flexibleCurrent = rewardPools[FLEXIBLE_POOL];
        uint256 flexibleDelta = flexibleCurrent.rewardPerTokenStored - snapshot.flexibleRewardPerToken;
        if (flexibleDelta != 0) {
            position.accruedFlexibleWater += (position.amount * flexibleDelta) / REWARD_PRECISION;
        }

        uint64 expiredEpoch = position.unlockEpoch;
        position.poolId = FLEXIBLE_POOL;
        position.unlockEpoch = 0;
        position.userRewardPerTokenPaid = flexibleCurrent.rewardPerTokenStored;

        emit PositionRolledToFlexible(account, expiredEpoch, position.amount);
        return true;
    }

    function _increaseCurrentPosition(Position storage position, uint256 amountAdded) internal {
        if (amountAdded == 0) revert ZeroAmount();

        position.amount += amountAdded;
        rewardPools[position.poolId].totalStaked += amountAdded;
        totalStakedWater += amountAdded;

        if (position.poolId == LOCKED_POOL) {
            if (position.unlockEpoch == 0) revert EpochAccountingInvariant();
            expiringLockedByEpoch[position.unlockEpoch] += amountAdded;
        }
    }

    function _debitAccruedRewards(Position storage position, uint256 amount) internal {
        uint256 remaining = amount;

        uint256 fromLocked = remaining < position.accruedLockedWater ? remaining : position.accruedLockedWater;
        if (fromLocked != 0) {
            position.accruedLockedWater -= fromLocked;
            RewardPool storage locked = rewardPools[LOCKED_POOL];
            if (locked.accruedLiability < fromLocked || locked.budget < fromLocked) {
                revert RewardAccountingInvariant();
            }
            locked.accruedLiability -= fromLocked;
            locked.budget -= fromLocked;
            remaining -= fromLocked;
        }

        if (remaining != 0) {
            if (position.accruedFlexibleWater < remaining) revert RewardAmountExceeded();
            position.accruedFlexibleWater -= remaining;
            RewardPool storage flexible = rewardPools[FLEXIBLE_POOL];
            if (flexible.accruedLiability < remaining || flexible.budget < remaining) {
                revert RewardAccountingInvariant();
            }
            flexible.accruedLiability -= remaining;
            flexible.budget -= remaining;
        }
    }

    function _transferFreshWaterToVault(address from, address vault, uint256 requested)
        internal
        returns (uint256 received)
    {
        uint256 beforeBalance = water.balanceOf(vault);
        water.safeTransferFrom(from, vault, requested);
        received = water.balanceOf(vault) - beforeBalance;
        if (received == 0) revert ZeroAmount();
    }

    function _updateBothTo(uint256 timestamp) internal {
        _updateRewardPoolTo(FLEXIBLE_POOL, timestamp);
        _updateRewardPoolTo(LOCKED_POOL, timestamp);
    }

    function _updateRewardPoolTo(uint8 poolId, uint256 timestamp) internal {
        RewardPool storage pool = rewardPools[poolId];
        uint256 applicable = timestamp < pool.periodFinish ? timestamp : pool.periodFinish;
        if (applicable <= pool.lastUpdateTime) return;

        uint256 elapsed = applicable - pool.lastUpdateTime;
        if (pool.totalStaked != 0 && pool.rewardRate != 0) {
            uint256 emitted = elapsed * pool.rewardRate;
            pool.rewardPerTokenStored += (emitted * REWARD_PRECISION) / pool.totalStaked;
            pool.accruedLiability += emitted;
            if (pool.accruedLiability > pool.budget) revert RewardAccountingInvariant();
        }
        pool.lastUpdateTime = uint64(applicable);
    }

    // ---------------------------------------------------------------------
    // View-only global preview
    // ---------------------------------------------------------------------

    function _previewGlobal(uint64 wantedExpiryEpoch)
        internal
        view
        returns (GlobalPreview memory preview)
    {
        RewardPool storage flexStorage = rewardPools[FLEXIBLE_POOL];
        RewardPool storage lockStorage = rewardPools[LOCKED_POOL];

        preview.flexible = PoolPreview({
            periodFinish: flexStorage.periodFinish,
            lastUpdateTime: flexStorage.lastUpdateTime,
            rewardRate: flexStorage.rewardRate,
            rewardPerTokenStored: flexStorage.rewardPerTokenStored,
            totalStaked: flexStorage.totalStaked,
            accruedLiability: flexStorage.accruedLiability
        });
        preview.locked = PoolPreview({
            periodFinish: lockStorage.periodFinish,
            lastUpdateTime: lockStorage.lastUpdateTime,
            rewardRate: lockStorage.rewardRate,
            rewardPerTokenStored: lockStorage.rewardPerTokenStored,
            totalStaked: lockStorage.totalStaked,
            accruedLiability: lockStorage.accruedLiability
        });

        uint64 current = _epochOf(block.timestamp);
        uint64 cursor = lastProcessedEpoch;
        uint256 steps;

        if (current > cursor && preview.locked.totalStaked != 0) {
            while (cursor < current && steps < uint256(MAX_EXPIRY_LOOKAHEAD_EPOCHS)) {
                cursor += 1;
                uint256 expiring = expiringLockedByEpoch[cursor];
                if (expiring != 0) {
                    uint64 boundary = epochStart(cursor);
                    preview.flexible = _previewUpdate(preview.flexible, boundary);
                    preview.locked = _previewUpdate(preview.locked, boundary);

                    if (wantedExpiryEpoch == cursor) {
                        preview.wantedExpiryFound = true;
                        preview.flexibleAtWantedExpiry = preview.flexible.rewardPerTokenStored;
                        preview.lockedAtWantedExpiry = preview.locked.rewardPerTokenStored;
                    }
                    if (preview.locked.totalStaked < expiring) revert EpochAccountingInvariant();
                    preview.locked.totalStaked -= expiring;
                    preview.flexible.totalStaked += expiring;
                }

                steps += 1;
                if (preview.locked.totalStaked == 0) break;
            }

            if (cursor < current && preview.locked.totalStaked != 0) revert EpochAccountingInvariant();
        }

        preview.flexible = _previewUpdate(preview.flexible, block.timestamp);
        preview.locked = _previewUpdate(preview.locked, block.timestamp);
    }

    function _previewUpdate(PoolPreview memory pool, uint256 timestamp)
        internal
        pure
        returns (PoolPreview memory)
    {
        uint256 applicable = timestamp < pool.periodFinish ? timestamp : pool.periodFinish;
        if (applicable <= pool.lastUpdateTime) return pool;

        uint256 elapsed = applicable - pool.lastUpdateTime;
        if (pool.totalStaked != 0 && pool.rewardRate != 0) {
            uint256 emitted = elapsed * pool.rewardRate;
            pool.rewardPerTokenStored += (emitted * REWARD_PRECISION) / pool.totalStaked;
            pool.accruedLiability += emitted;
        }
        pool.lastUpdateTime = uint64(applicable);
        return pool;
    }

    // ---------------------------------------------------------------------
    // Pure helpers
    // ---------------------------------------------------------------------

    function _epochOf(uint256 timestamp) internal pure returns (uint64) {
        return uint64(timestamp / uint256(EPOCH_DURATION));
    }

    function _expiryEpochForTimestamp(uint256 timestamp) internal pure returns (uint64) {
        uint256 target = timestamp + uint256(LOCK_DURATION);
        uint256 epoch = (target + uint256(EPOCH_DURATION) - 1) / uint256(EPOCH_DURATION);
        return uint64(epoch);
    }

    function _validatePool(uint8 poolId) internal pure {
        if (poolId != FLEXIBLE_POOL && poolId != LOCKED_POOL) revert InvalidPool();
    }
}
