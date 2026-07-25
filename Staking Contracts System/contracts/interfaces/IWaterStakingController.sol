// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IWaterStakingController {
    function isSwapAdapter(address adapter) external view returns (bool);
    function emergencyShutdown() external view returns (bool);
    function bnbCompoundingEnabled() external view returns (bool);
    function syncPosition(address account) external returns (bool rolledToFlexible);
    function registerBnbCompound(uint256 waterAmount) external;
}
