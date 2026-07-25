# V2.2 Architecture

```text
                         WATER STAKING CONTROLLER
                   reward accounting / daily epochs
                              /      \
                             /        \
                    FLEXIBLE          LOCKED
                   reward reserve    reward reserve
                         ^                |
                         |                | 30-day minimum
                         +----------------+
                            daily rollover

       ERC-1167 factory / permanent user vault mapping

 Alice wallet -> AliceVault -- WATER principal + BNB dividends
 Bob wallet   -> BobVault   -- WATER principal + BNB dividends
```

## Custody boundary

The controller holds funded WATER rewards only.

Each vault holds one user's principal WATER and that vault's native BNB dividends.

The controller's normal release path is hard-coded by the vault to send WATER only to the vault owner.

## Epoch boundary

`EPOCH_DURATION = 1 days`.

A fresh lock uses:

```text
expiryEpoch = ceil((block.timestamp + 30 days) / 1 day)
unlockAt    = expiryEpoch * 1 day
```

This guarantees no lock shorter than 30 days while letting every day's expiries be aggregated into one storage bucket.

## Global vs user state

Global pool totals move at the expiry epoch even if an individual user never returns.

A user's stored `poolId` may remain `LOCKED` until their next interaction. The boundary snapshot lets that user later settle:

```text
Locked rewards: previous checkpoint -> expiry boundary
Flexible rewards: expiry boundary -> current time
```

This prevents stale users from distorting the global Locked/Flexible denominators.
