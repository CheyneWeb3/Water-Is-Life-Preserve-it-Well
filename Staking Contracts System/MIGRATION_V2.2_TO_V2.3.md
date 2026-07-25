# V2.2 -> V2.3 Changes

V2.3 keeps V2.2 staking economics and daily expiry accounting. The change is operational authority separation.

## Added

- `operator` address.
- OWNER-only `setOperator(address)`.
- `onlyOperatorOrOwner` routine role modifier.
- bounded `runMaintenance(address[] accounts)` for server automation.
- feature switches for Flexible staking, Locked staking, Re-lock, WATER compounding and BNB compounding.
- `OperatorUpdated`, `FeatureUpdated`, and `MaintenanceRun` events.
- OPERATOR ability to routine pause/unpause staking entry/compound actions.
- vault-side BNB-compounding feature enforcement.

## Explicitly not delegated to OPERATOR

- reward funding;
- reward scheduling;
- adapter proposal/cancel;
- controller asset recovery;
- emergency shutdown activation;
- ownership transfer;
- user WATER/BNB claims;
- user principal withdrawal;
- user emergency exit.

## Emergency exit invariant

`WaterStakingVault.emergencyExitWater()` remains `onlyOwner`. It has no recipient parameter and transfers WATER to the vault's stored owner only.

## Constructor change

V2.2:

```solidity
constructor(address water_)
```

V2.3:

```solidity
constructor(address water_, address operator_)
```

Passing `address(0)` as `operator_` initially assigns the deployer as operator. The deployment script uses `OPERATOR_ADDRESS` if provided.
