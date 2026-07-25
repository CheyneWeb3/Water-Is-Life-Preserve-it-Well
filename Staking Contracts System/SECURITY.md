# V2.2 Security Invariants

## Principal

1. User principal is held in the user's vault.
2. The controller cannot select an arbitrary recipient for normal vault WATER release.
3. Normal Locked principal cannot leave before its expiry epoch.
4. Global rollover changes accounting only; it does not transfer principal.
5. Catastrophic shutdown gives the vault owner a direct WATER exit independent of reward accounting.

## Rewards

1. Flexible and Locked reward budgets are finite and separately funded.
2. No multiplier or weighted-stake mechanism exists.
3. Emitted liabilities cannot exceed a pool's funded budget.
4. Controller WATER recovery is limited to balance above both funded reward budgets.
5. Fee-on-transfer funding/compounding uses actual balance deltas where applicable.

## Expiry

1. Expiries are aggregated by daily epoch, not queued per user.
2. One user's stale stored position cannot block another user.
3. Global pool denominators change at the stored daily boundary snapshot.
4. Catch-up is bounded by the maximum 31-epoch look-ahead of a new lock.
5. Fresh principal restarts a live lock; compounded rewards retain its existing expiry.

## BNB

1. User BNB remains in the user's vault.
2. BNB claim is owner-only.
3. Adapter output must return to the calling vault.
4. Adapter approval/revocation has a fixed 24-hour delay.
5. During emergency shutdown, BNB claims bypass controller synchronization.

## Administrative trust

Production ownership should be transferred to a multisig. Emergency shutdown is irreversible. Adapter changes are delayed. Reward funding/rates remain administrative economic controls but cannot redirect vault principal.
