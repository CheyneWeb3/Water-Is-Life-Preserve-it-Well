# WATER Dividend-Preserving Staking V2.3

Solidity `0.8.19` / OpenZeppelin `4.5.0` staking system for a dividend-paying WATER token on EVM/BSC.

V2.3 keeps the V2.2 daily-epoch reward/expiry model and adds a strict three-layer authority model: **OWNER/MULTISIG**, **OPERATOR**, and **USER VAULT OWNER**.

## Canonical staking rules

- One permanent ERC-1167 vault per user.
- User principal WATER stays in that user's vault, never in the staking controller.
- The vault can receive native BNB dividends from WATER's existing dividend mechanism.
- Two WATER reward pools only: `Flexible` and `Locked`.
- The reward advantage comes from funding the two finite reward reserves differently, e.g. 35/65. There are no staking multipliers.
- Locked principal is locked for at least 30 days and expires at the next UTC daily epoch boundary after 30 days.
- At expiry, the position moves economically from Locked to Flexible without moving WATER out of the user's vault.
- Locked users may claim WATER, claim BNB, compound WATER, compound BNB, or partially claim/compound during the lock.
- Compounding rewards never extends the current lock.
- Fresh wallet WATER added to an active Locked position restarts the entire position for a new 30-day term.
- After expiry the user may stay Flexible, withdraw, or explicitly re-lock.

## Authority model

### OWNER / MULTISIG

High-security governance only:

- appoint/revoke the OPERATOR;
- fund Flexible/Locked reward reserves;
- schedule reward emissions;
- propose/cancel BNB->WATER adapter changes;
- recover only excess/unrelated controller assets;
- activate irreversible emergency shutdown;
- transfer contract ownership.

The owner cannot choose a destination for user-vault principal. Normal vault WATER release is hard-coded to that vault's owner.

### OPERATOR

Routine server/automation signer:

- run daily epoch maintenance;
- batch-sync up to 100 user positions per maintenance transaction;
- enable/disable Flexible staking;
- enable/disable new 30-day Locked staking;
- enable/disable Re-lock;
- enable/disable WATER compounding;
- enable/disable BNB->WATER compounding;
- routine pause/unpause of entry/compound actions.

The operator **cannot**:

- withdraw WATER from a user's vault;
- claim a user's WATER rewards;
- claim a user's BNB;
- emergency-exit a user's vault;
- change a vault owner;
- fund/schedule rewards;
- approve swap adapters;
- recover controller assets;
- activate emergency shutdown.

`setOperator(address)` is OWNER-only. Set it to `address(0)` to revoke the server operator.

### USER / VAULT OWNER

The user controls their own position and vault:

- stake Flexible;
- stake Locked;
- re-lock after expiry;
- withdraw Flexible principal;
- claim WATER rewards;
- compound WATER rewards;
- claim native BNB dividends directly from their vault;
- compound vault BNB through an approved adapter;
- recover unrelated tokens accidentally sent to their vault;
- after catastrophic shutdown, call `emergencyExitWater()` themselves.

## User-only emergency principal exit

`activateEmergencyShutdown()` is OWNER-only and irreversible.

Once activated, normal staking/controller accounting stops. Each **individual vault owner** can call:

```solidity
emergencyExitWater()
```

on their own vault.

The function is `onlyOwner` at the vault level and sends every WATER token in the vault to the vault's stored `owner` address. The controller owner, operator, server, treasury and other users cannot call it successfully.

BNB remains independently claimable by the vault owner during shutdown. Unclaimed controller-side WATER staking rewards may be forfeited in catastrophic shutdown; principal recovery takes priority.

## Daily expiry and operator maintenance

`expiringLockedByEpoch[epoch]` stores the aggregate Locked WATER expiring at a UTC daily boundary.

The first normal state-changing interaction in a new day calls the same global synchronization internally, so users do **not** depend on the operator for correctness.

The server operator can proactively call:

```solidity
runMaintenance(address[] accounts)
```

This:

1. synchronizes the global daily epoch;
2. moves any aggregate expired amount from Locked totals to Flexible totals;
3. stores the reward-per-token boundary snapshot;
4. lazily synchronizes up to 100 supplied user records;
5. emits `MaintenanceRun` plus normal rollover events.

It transfers no user assets.

The public permissionless helpers remain available:

```solidity
syncGlobalEpoch()
syncPosition(address account)
```

so protocol correctness never relies solely on the operator server being online.

## Operational feature switches

Feature IDs:

```text
0  Flexible staking
1  Locked 30-day staking
2  Re-lock
3  WATER compounding
4  BNB -> WATER compounding
```

OWNER or OPERATOR can call:

```solidity
setFeatureEnabled(uint8 featureId, bool enabled)
```

Claims, Flexible withdrawals, daily expiry rollover and emergency vault exit are deliberately **not** controlled by these feature flags.

Routine `pauseStaking()` also does not disable `claimWater()` or `withdraw()`.

## Reward funding

A 35/65 configuration is not hard-coded:

```text
Total reward reserve: 100,000,000 WATER
Flexible funding:      35,000,000 WATER
Locked funding:        65,000,000 WATER
```

Use:

```solidity
fundRewards(FLEXIBLE_POOL, flexibleAmount)
fundRewards(LOCKED_POOL, lockedAmount)
scheduleRewards(FLEXIBLE_POOL, duration)
scheduleRewards(LOCKED_POOL, duration)
```

A later program can use a different split without redeploying the vault/controller architecture.

## BNB compounding

BNB stays in the user's vault until the user chooses to claim or compound it.

The included Pancake V2 adapter:

- forces swap output back to the calling user vault;
- supports a deployment-fixed route such as `WBNB -> WATER` or `WBNB -> USDC -> WATER`;
- preserves user-provided `minWaterOut` and `deadline` protection;
- is usable only when both the adapter is approved and `bnbCompoundingEnabled == true`.

Adapter approvals/revocations have a fixed 24-hour delay.

## Deployment

Set:

```text
WATER_ADDRESS=
DEPLOYER_PRIVATE_KEY=
BSC_TESTNET_RPC_URL=
BSC_MAINNET_RPC_URL=
FINAL_OWNER=
OPERATOR_ADDRESS=
```

`FINAL_OWNER` should be the high-security owner/multisig. `OPERATOR_ADDRESS` should be the server automation signer and should hold only enough BNB for maintenance gas.

Then:

```bash
npm install
npm run compile
npm test
```

See `SECURITY.md`, `ARCHITECTURE.md`, `MIGRATION_V2.2_TO_V2.3.md`, and `VALIDATION.md` before deployment.
