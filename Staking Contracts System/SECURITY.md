# WATER Staking V2.3 Security Invariants

## Principal custody

1. User staking principal is held in the user's permanent vault, not the controller.
2. `WaterStakingVault.releaseWater()` is controller-callable but always transfers WATER to the vault's stored owner.
3. The controller cannot supply an arbitrary principal recipient.
4. `emergencyExitWater()` is callable only by that vault's owner.
5. Emergency exit sends all vault WATER only to the vault owner.
6. OPERATOR has no vault method privilege.

## Operator limitations

OPERATOR is deliberately not a second owner.

It may:

- synchronize epochs and positions;
- run bounded batch maintenance;
- control operational feature flags;
- routine pause/unpause entry/compound functions.

It may not:

- fund or schedule rewards;
- recover assets;
- propose/cancel adapters;
- appoint another operator;
- activate emergency shutdown;
- release, claim or redirect user assets.

Compromise of the operator key should therefore create an availability/feature-control incident, not a user-principal custody incident.

## User exit availability

Feature switches never disable:

- `claimWater()`;
- `withdraw()` for Flexible principal;
- `claimBNB()`;
- expiry synchronization;
- user-only `emergencyExitWater()` after shutdown.

Routine `pauseStaking()` is intentionally not applied to `claimWater()` or `withdraw()`.

## Reward accounting

- Flexible and Locked use independent finite budgets.
- No multiplier or weighted-stake accounting exists.
- Daily aggregate expiry changes pool denominators at a stored boundary snapshot.
- Individual stale Locked records are lazily settled using that snapshot.
- Compounded WATER joins the current economic pool and a live lock's existing expiry.
- Fresh external WATER added to a live lock reschedules the whole amount to a new expiry epoch.

## BNB compounding

- User vault owner initiates the swap.
- BNB remains in the vault until that action.
- Adapter must be approved and BNB compounding feature enabled.
- Adapter output recipient must be the calling vault.
- Vault verifies actual WATER balance increase and `minWaterOut`.
- Controller registers only an increase backed by the vault's WATER balance.

## Emergency shutdown

Emergency shutdown is irreversible. It intentionally prioritizes principal recovery over controller-side unclaimed WATER rewards.

The OWNER can activate shutdown but cannot execute a user's vault exit. Each user must execute their own `emergencyExitWater()`.

## Production requirements

Before mainnet funding:

- compile with Solidity 0.8.19 and pinned OpenZeppelin 4.5.0;
- run the complete Hardhat tests;
- run fuzz/invariant tests;
- test with the actual WATER token and dividend tracker;
- confirm user vault contracts receive BNB dividends;
- exclude the reward controller from WATER dividends if supported;
- use a multisig for OWNER;
- use a separate low-balance hot key for OPERATOR;
- monitor all `OperatorUpdated`, `FeatureUpdated`, `MaintenanceRun`, rollover and emergency events.
