// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../interfaces/IBnbToWaterAdapter.sol";

contract MockBnbWaterAdapter is IBnbToWaterAdapter {
    using SafeERC20 for IERC20;

    IERC20 public immutable waterToken;
    uint256 public immutable waterPerBnb;

    constructor(address water_, uint256 waterPerBnb_) {
        waterToken = IERC20(water_);
        waterPerBnb = waterPerBnb_;
    }

    function swapExactBNBForWater(
        address water,
        uint256 minWaterOut,
        address recipient,
        uint256
    ) external payable returns (uint256 waterOut) {
        require(water == address(waterToken), "wrong water");
        require(recipient == msg.sender, "recipient must caller");
        waterOut = (msg.value * waterPerBnb) / 1 ether;
        require(waterOut >= minWaterOut, "slippage");
        waterToken.safeTransfer(recipient, waterOut);
    }
}
