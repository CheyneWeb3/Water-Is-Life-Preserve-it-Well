// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IBnbToWaterAdapter {
    function swapExactBNBForWater(
        address water,
        uint256 minWaterOut,
        address recipient,
        uint256 deadline
    ) external payable returns (uint256 waterOut);
}
