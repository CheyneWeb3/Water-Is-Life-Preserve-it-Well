# WATER Staking V2.3 Architecture

## Contract graph

```text
                         OWNER / MULTISIG
                              |
                 high-risk governance only
                              |
                    WaterStakingController
                              |
             appoints/revokes OPERATOR signer
                              |
             +----------------+----------------+
             |                                 |
       OPERATOR / SERVER                 Reward reserves
       maintenance only               Flexible + Locked
             |
    daily epoch / feature controls

                    WaterStakingController
                              |
                       ERC-1167 clones
             +----------------+----------------+
             |                |                |
         AliceVault        BobVault        SeanVault
         Alice owns        Bob owns        Sean owns
         WATER + BNB       WATER + BNB     WATER + BNB
```

## Custody boundary

User WATER principal is transferred directly from the user wallet into that user's permanent vault. The controller records the economic position but does not custody principal.

Controller WATER is the separately funded staking reward reserve only.

Native BNB dividends are received directly by each vault.

## Pools

- `FLEXIBLE_POOL = 0`
- `LOCKED_POOL = 1`

There are no staking multipliers. Flexible/Locked relative return is produced by their separately funded reward reserves and live stake denominators.

## Lock lifecycle

A fresh lock uses `ceil((now + 30 days) / 1 day)` as its expiry epoch. It is therefore never shorter than 30 days and is less than 31 days.

At the expiry epoch boundary:

1. both reward pools are checkpointed at the boundary;
2. the day's aggregate expiring amount is subtracted from Locked total stake;
3. the same amount is added to Flexible total stake;
4. a reward-per-token snapshot is stored;
5. individual user storage is lazily converted to Flexible on its next sync.

The WATER itself does not move during rollover.

## Daily maintenance

Every normal user state-changing controller action calls `_prepareAccount()`, which calls `_syncGlobal()` and then `_syncPosition(user)`.

The server may proactively call `runMaintenance(accounts)`. This is bounded to 100 accounts and has no value-transfer authority.

Permissionless `syncGlobalEpoch()` and `syncPosition(account)` remain available as a trust-minimizing fallback.

## Authority matrix

| Capability | Owner | Operator | User |
|---|---:|---:|---:|
| Appoint operator | Yes | No | No |
| Fund reward reserves | Yes | No | No |
| Schedule emissions | Yes | No | No |
| Adapter proposal/cancel | Yes | No | No |
| Execute elapsed adapter proposal | Public after delay | Public after delay | Public after delay |
| Run daily maintenance | Yes | Yes | Via public sync helpers |
| Feature switches | Yes | Yes | No |
| Routine pause/unpause | Yes | Yes | No |
| Stake/claim/compound/withdraw own position | No special privilege | No special privilege | Yes |
| Claim vault BNB | No | No | Vault owner only |
| Emergency exit vault WATER | No | No | Vault owner only |
| Activate irreversible shutdown | Yes | No | No |
| Recover controller excess assets | Yes | No | No |

## Feature controls

Feature flags affect only new/risk-increasing actions:

- Flexible staking
- Locked staking
- Re-lock
- WATER compounding
- BNB compounding

They do not gate user WATER claims, Flexible withdrawals, expiry synchronization, or catastrophic user-only principal exit.

## Emergency model

Owner may irreversibly activate emergency shutdown. Once active, controller staking/accounting actions stop. Each vault owner can call `emergencyExitWater()` directly.

The vault destination is not passed as an argument; it is permanently the vault's `owner` storage value. This prevents owner/operator/server redirection of principal.
