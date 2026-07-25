// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IBnbToWaterAdapter.sol";

interface IPancakeV2RouterLike {
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;
}

/// @title Pancake V2 BNB -> WATER Compounding Adapter
/// @notice Narrow adapter with a deployment-fixed route. Output is forced back to the calling vault.
/// @dev Deploy one adapter per desired route, e.g. WBNB->WATER or WBNB->USDC->WATER.
contract PancakeV2BnbWaterAdapter is IBnbToWaterAdapter {
    error ZeroAddress();
    error WrongWater();
    error WrongRecipient();
    error ZeroAmount();
    error SlippageExceeded();
    error InvalidPath();

    address public immutable router;
    address public immutable wbnb;
    address public immutable waterToken;
    address[] private _path;

    constructor(address router_, address wbnb_, address water_, address[] memory path_) {
        if (router_ == address(0) || wbnb_ == address(0) || water_ == address(0)) revert ZeroAddress();
        if (path_.length < 2 || path_[0] != wbnb_ || path_[path_.length - 1] != water_) revert InvalidPath();
        for (uint256 i = 0; i < path_.length; i++) {
            if (path_[i] == address(0)) revert ZeroAddress();
            _path.push(path_[i]);
        }

        router = router_;
        wbnb = wbnb_;
        waterToken = water_;
    }

    function path() external view returns (address[] memory) {
        return _path;
    }

    function swapExactBNBForWater(
        address water,
        uint256 minWaterOut,
        address recipient,
        uint256 deadline
    ) external payable override returns (uint256 waterOut) {
        if (msg.value == 0) revert ZeroAmount();
        if (water != waterToken) revert WrongWater();
        if (recipient != msg.sender) revert WrongRecipient();

        uint256 beforeBalance = IERC20(waterToken).balanceOf(recipient);
        address[] memory route = _path;

        IPancakeV2RouterLike(router).swapExactETHForTokensSupportingFeeOnTransferTokens{value: msg.value}(
            minWaterOut,
            route,
            recipient,
            deadline
        );

        waterOut = IERC20(waterToken).balanceOf(recipient) - beforeBalance;
        if (waterOut < minWaterOut) revert SlippageExceeded();
    }
}
