# V2.2 Audit Remediation

Date: 2026-07-25

## A-01 — global exact-expiry queue griefing

**Status: REMEDIATED BY REDESIGN**

Removed the per-user exact-expiry queue. Expiries are aggregated by one UTC daily epoch bucket. The first interaction in a new epoch performs aggregate rollover. The number of users expiring that day does not change rollover complexity.

Catch-up after inactivity is bounded to 31 epoch checks because no existing lock can be scheduled beyond that horizon without an interaction that first advances `lastProcessedEpoch`.

## A-02 — catastrophic accounting could trap principal

**Status: REMEDIATED**

Added irreversible `activateEmergencyShutdown()` and vault-level `emergencyExitWater()`. Once shutdown is active, the vault owner can recover all vault WATER without invoking controller reward/expiry accounting. BNB remains directly claimable.

## A-03 — real WATER/dividend integration unknown

**Status: OPEN DEPLOYMENT GATE**

This cannot be closed without the actual WATER token/dividend contract. User vault dividend eligibility and controller dividend exclusion must be tested before production funding.

## A-04 — immediate adapter administration

**Status: REMEDIATED**

Adapter approval/revocation now uses propose -> 24-hour delay -> execute. The adapter route itself is fixed at adapter deployment and swap output is forced back to the calling vault.

## A-05 — accidental WATER at controller trapped

**Status: REMEDIATED**

Added `recoverExcessControllerWater()` limited to WATER above the sum of both funded reward budgets.

## A-06 — direct WBNB/WATER path only

**Status: REMEDIATED**

Pancake V2 adapter now supports a fixed multi-hop path supplied at deployment, while requiring WBNB first and WATER last.

## A-07 — rounding dust

**Status: ACCEPTED / LOW**

Integer reward-per-token accounting can leave very small residual dust. It does not create a principal-loss or overpayment path.

## A-08 — adversarial validation depth

**Status: EXPANDED, EXECUTION PENDING**

V2.2 includes tests for daily aggregate expiry, long inactivity, stale-user settlement, lock restart scheduling, emergency direct exit, adapter timelock, reward allocation, partial reward claims and controller excess recovery.

Hardhat execution remains pending in this environment because npm dependency retrieval timed out.
