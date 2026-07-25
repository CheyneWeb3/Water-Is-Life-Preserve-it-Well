# Server Operator Integration

The V2.3 controller separates the server signer (`operator`) from the high-security contract owner.

## Recommended key setup

- `OWNER`: multisig/cold governance wallet.
- `OPERATOR`: dedicated server hot wallet with only enough BNB for gas.
- Never place the OWNER private key on the application server.

## Daily maintenance

The operator may call:

```solidity
runMaintenance(address[] accounts)
```

A safe daily job can call `runMaintenance([])` once per UTC day. That processes global expiry epochs without needing any user list.

If the backend also keeps a list of recently active/expired users, it may pass up to 100 addresses to settle their lazy stored positions in the same transaction.

This maintenance is optional for correctness: the first normal user state-changing action also performs global synchronization, and `syncGlobalEpoch()` / `syncPosition(address)` remain permissionless.

## Suggested server flow

```text
UTC day changes
    |
    v
operator calls runMaintenance([])
    |
    +-- expired daily bucket? yes -> Locked total moves to Flexible total
    |
    +-- emits GlobalEpochSynced / LockedEpochRolledToFlexible / MaintenanceRun
```

## Feature operations

`setFeatureEnabled(featureId, enabled)` may be called by OWNER or OPERATOR.

```text
0 = Flexible staking
1 = Locked staking
2 = Re-lock
3 = WATER compounding
4 = BNB -> WATER compounding
```

Use feature switches for routine incidents or staged rollout. They do not block claims, Flexible withdrawals, expiry sync or emergency vault recovery.

The operator can also call `pauseStaking()` / `unpauseStaking()`. Routine pause blocks stake/re-lock/compound paths but deliberately keeps user claim/withdraw paths open.

## Event indexing

At minimum index:

- `OperatorUpdated`
- `FeatureUpdated`
- `MaintenanceRun`
- `GlobalEpochSynced`
- `LockedEpochRolledToFlexible`
- `PositionRolledToFlexible`
- `VaultCreated`
- `FlexibleStaked`
- `LockedStaked`
- `WaterClaimed`
- `WaterCompounded`
- `BnbCompoundedIntoWater`
- `Withdrawn`
- `EmergencyShutdownActivated`

## What the operator can never do

The operator has no contract path to choose a recipient for user principal or BNB. It cannot call a user's `emergencyExitWater()` because that function is enforced by the individual vault's `onlyOwner` modifier.
