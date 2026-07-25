# Remix deployment

Use files from the `remix/` directory. Their OpenZeppelin imports are pinned to the `v4.5.0` GitHub tag.

Compile with Solidity `0.8.19` and optimizer enabled (500 runs to match Hardhat config).

Deployment order:

1. Deploy `WaterStakingController(WATER_ADDRESS)`.
2. The controller constructor deploys the vault implementation automatically.
3. Optionally deploy `PancakeV2BnbWaterAdapter(router, WBNB, WATER, path)`.
4. Call `proposeSwapAdapter(adapter, true)`; execute after 24 hours with `executeSwapAdapterChange(adapter)`.
5. Fund Flexible and Locked reserves independently with `fundRewards(0, amount)` / `fundRewards(1, amount)`.
6. Call `scheduleRewards(0, duration)` and `scheduleRewards(1, duration)`.
7. Transfer controller ownership to the intended production multisig.

Do not fund production rewards until the real WATER dividend integration has been tested with a deployed user vault.
