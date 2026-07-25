# WATER Dividend-Preserving Staking V2.2

Solidity `0.8.19` / OpenZeppelin `4.5.0` staking system for a dividend-paying WATER token on EVM/BSC.

## Canonical rules

- One permanent ERC-1167 vault per user.
- User principal WATER stays in the user's vault, not in the controller.
- The vault can receive native BNB dividends from WATER's existing dividend mechanism.
- Two WATER reward pools only: `Flexible` and `Locked`.
- Reward advantage comes from how the finite reward reserves are funded (for example 35/65). There are no staking multipliers.
- Locked principal is locked for at least 30 days.
- Expiry is rounded up to the next UTC daily epoch boundary, so a lock lasts 30-31 days and is never shorter than 30 days.
- The first state-changing interaction in a new daily epoch performs the aggregate expiry check for that period.
- Expiring Locked principal is moved economically to Flexible; WATER never moves between contracts during rollover.
- Individual user records are synchronized lazily against the stored daily boundary snapshot.
- Locked users can claim WATER, claim BNB, compound WATER, compound BNB, or partially do any of those during the lock.
- Compounding does not extend the current lock.
- Fresh wallet WATER added to an active lock restarts the whole position's lock.
- After expiry the user can remain Flexible, withdraw, or explicitly re-lock.

## Daily expiry model

`expiringLockedByEpoch[epoch]` stores only the aggregate WATER amount expiring on a UTC day boundary.

On the first interaction in a new epoch:

1. The controller checks daily epochs since the last processed epoch.
2. Empty days cost only a mapping read.
3. If an epoch has expiring WATER, both reward pools are checkpointed exactly at that boundary.
4. The aggregate amount is removed from Locked `totalStaked` and added to Flexible `totalStaked`.
5. The Locked/Flexible reward-per-token snapshot for that boundary is stored permanently for lazy user settlement.
6. Reward pools are then updated to the current transaction timestamp.

Because every new/restarted lock first synchronizes the current epoch and a lock can expire at most 31 daily epochs later, catch-up work is bounded to 31 epoch checks even after a very long period with no transactions.

## Emergency principal recovery

`activateEmergencyShutdown()` is irreversible.

Once activated:

- Normal controller accounting/staking actions stop.
- Each vault owner may call `emergencyExitWater()` directly on their vault.
- That function transfers all WATER held by the vault directly to its owner without running controller reward/expiry accounting.
- BNB remains independently claimable from the vault.
- Unclaimed WATER staking rewards may be forfeited in this catastrophic mode.

This is deliberately a principal-safety mechanism, not a normal early-unlock feature.

## Reward funding

A 35/65 configuration is not hard-coded:

```text
Total reward reserve: 100,000,000 WATER
Flexible funding:      35,000,000 WATER
Locked funding:        65,000,000 WATER
```

Fund each pool independently with `fundRewards(poolId, amount)`, then call `scheduleRewards(poolId, duration)`.

## BNB compounding

BNB stays in the user's vault. The user may route some/all BNB through an approved adapter.

The included Pancake V2 adapter:

- forces swap output back to the calling vault;
- supports a deployment-fixed route such as `WBNB -> WATER` or `WBNB -> USDC -> WATER`;
- uses the fee-on-transfer-supporting Pancake V2 swap function;
- preserves `minWaterOut` and `deadline` protection.

Adapter approvals/revocations use a 24-hour on-chain delay.

## Production integration requirement

Before deployment with the real WATER token, verify its dividend implementation:

- user vault contract addresses are eligible for BNB dividends;
- the staking reward controller can be excluded from dividends;
- wallet -> vault, controller -> vault/user, and vault -> user WATER transfers behave as expected;
- any WATER transfer tax is understood and accepted.

The reward controller should normally be excluded from dividends because it can hold a large pre-funded WATER reward reserve.

## Local validation

```bash
npm install
npm run compile
npm test
```

The included test suite covers the daily aggregate rollover, 35/65 funding model, locked claims, WATER/BNB compounding, lock restart, long inactivity, adapter timelock, permanent vault reuse, excess-token recovery and catastrophic direct principal exit.

See `VALIDATION.md` for the current validation status.
