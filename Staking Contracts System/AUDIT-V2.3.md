# V2.3 Operator/Custody Review — 2026-07-25

Scope: operator role introduction, operational feature flags, server maintenance and emergency-vault custody boundary.

## Result

The V2.3 role design intentionally separates operational availability powers from custody/economic governance powers.

### Operator compromise impact

An attacker controlling OPERATOR can disable/re-enable selected entry/compound features, routine pause/unpause, and execute maintenance synchronization. They cannot withdraw or redirect user vault WATER/BNB, schedule/fund rewards, recover controller assets, approve swap adapters, appoint a new operator, or trigger catastrophic emergency shutdown.

### Emergency principal path

PASS by source review: `emergencyExitWater()` is `onlyOwner` in `WaterStakingVault` and transfers to the stored vault owner. OWNER/OPERATOR receive no bypass.

### Daily maintenance

`runMaintenance()` performs global daily synchronization and lazy user settlements only. It has no external value-transfer call and is bounded to 100 supplied accounts.

### Feature controls

Claims, Flexible withdrawals and public synchronization are not feature-gated. Routine pause does not block `claimWater()` or `withdraw()`.

## Remaining validation gate

This environment could not complete npm dependency retrieval, so V2.3 has not been represented as compiled/test-passed here. Run `npm install && npm run compile && npm test` before deployment, then perform actual-WATER integration and fuzz/invariant testing.
