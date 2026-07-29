# WATER Dividend-Preserving Staking

## Stake WATER. Keep Your BNB Dividend Exposure. Earn Additional WATER.

WATER Staking was built specifically for a dividend-paying token.

Traditional staking normally moves every user's tokens into one shared staking contract. For a dividend token, that creates a problem: the shared staking contract becomes the on-chain holder and can receive the dividends that would otherwise belong to individual holders.

WATER Staking uses a different architecture.

Each user receives a **permanent personal on-chain vault**. Your vault holds your staked WATER, remains an on-chain WATER holder, and can continue receiving eligible BNB dividend rewards while the staking system separately accounts for additional WATER rewards.

The result is a staking system designed around the token instead of forcing the token to behave like a normal non-dividend asset.


<img src="https://raw.githubusercontent.com/CheyneWeb3/Water-Is-Life-Preserve-it-Well/refs/heads/DevOps/readme.webp" alt="Conceptual App Idea Only" width="1100">

Conceptual App Idea Only


# What the Current System Does

A single personal vault can hold **two completely independent staking positions at the same time**:

```text
YOUR PERSONAL WATER VAULT
│
├── FLEXIBLE POSITION
│   ├── Separate principal
│   ├── Separate WATER reward accounting
│   └── Withdrawable without a fixed lock
│
└── LOCKED POSITION
    ├── Separate principal
    ├── Separate WATER reward accounting
    └── Fixed 30-day lock
```

Flexible WATER is never silently moved into Locked staking.

Locked WATER is never mixed with Flexible principal.

You can hold both positions simultaneously inside the same permanent vault.

---

# Hold WATER

Holding WATER normally in your wallet allows the wallet to participate in WATER's existing BNB dividend system according to the token's rules.

### Holding WATER can earn

**BNB dividends**

Your WATER remains in your wallet and is not participating in the staking reward pools.

---

# Stake WATER

When you stake for the first time, the staking system creates your permanent personal vault.

Your WATER moves from your wallet into that vault.

The vault becomes the on-chain holder of the staked WATER.

### Staked WATER can earn

**BNB dividends**

plus

**WATER staking rewards**

The BNB and WATER reward systems remain separate.

```text
YOUR WALLET
     │
     │ Stake WATER
     ▼
YOUR PERSONAL VAULT
     │
     ├── Flexible WATER
     ├── Locked WATER
     ├── Receives eligible WATER BNB dividends
     └── Participates in WATER staking rewards
```

The same vault is reused throughout the user's staking lifetime.

---

# Your Vault Is Permanent

Your vault is created once and then reused.

You do not receive a new staking contract every time you stake, withdraw, lock or return later.

```text
FIRST STAKE
     ↓
Permanent personal vault created
     ↓
Stake / withdraw / claim / compound
     ↓
Vault can become empty
     ↓
Stake again later
     ↓
Same vault reused
```

The vault address remains stable even when the shared vault implementation is upgraded through the protocol's UpgradeableBeacon.

---

# Flexible and Locked Are Independent

This is a core rule of the current system.

Example:

```text
Flexible: 100,000 WATER
Locked:    50,000 WATER
```

If you add another:

```text
20,000 WATER
```

to Locked staking, the result is:

```text
Flexible: 100,000 WATER
Locked:    70,000 WATER
```

The existing 100,000 Flexible WATER is untouched.

It is never automatically moved or locked.

---

# Flexible Staking

Flexible staking is the liquid side of the protocol.

### Flexible provides

**Eligible BNB dividends**

plus

**Flexible-pool WATER rewards**

plus

**Flexible principal withdrawal**

Flexible and Locked use separate principal balances and separate reward checkpoints.

A user can add more WATER to Flexible without changing their Locked position or Locked expiry.

---

# Locked Staking

The current Locked product uses a **fixed 30-day lock**.

There are not multiple 90 / 180 / 365-day multiplier tiers in the current contract system.

Locked staking receives rewards from its own independently funded reward pool.

```text
LOCKED WATER
     │
     ├── Fixed 30-day principal lock
     ├── Eligible BNB dividends
     └── Locked-pool WATER rewards
```

The advantage of Locked staking comes from the reward allocation/emission assigned to the Locked pool.

It is **not** implemented as a fake multiplier layered on top of another pool.

---

# Two Independent WATER Reward Pools

The current staking controller maintains two WATER reward pools:

```text
WATER STAKING REWARD PROGRAM
│
├── FLEXIBLE REWARD POOL
│
└── LOCKED REWARD POOL
```

Each pool has its own:

- funded WATER budget;
- reward rate;
- reward period;
- total active stake;
- reward-per-token accounting;
- accrued user liabilities; and
- remaining reward reserve.

The protocol can fund and schedule the two pools independently.

A larger allocation to Locked staking creates the Locked reward advantage.

For example, a program may choose a split such as:

```text
35% → Flexible rewards
65% → Locked rewards
```

but the contracts do not rely on a hard-coded reward multiplier to create that difference.

---

# How WATER Rewards Accrue

WATER staking rewards mathematically accrue from the active pool's reward rate and blockchain time.

They do **not** require someone to send a transaction every block.

Conceptually:

```text
Pool emission over time
        ×
User stake / Total stake in that pool
        =
User WATER reward
```

The read-only **WATER Staking Lens** can calculate the user's current claimable WATER from the latest blockchain timestamp.

This means a frontend can display a continuously increasing claimable reward without spending gas every time the number changes.

Transactions checkpoint/materialize the position when required, such as when the user:

- stakes;
- withdraws;
- claims;
- compounds;
- re-locks;
- performs an emergency Locked exit; or
- has the position synchronized after a Locked expiry.

---

# BNB Dividends

The user's personal vault is the actual holder of the staked WATER.

That allows the vault to participate in WATER's existing dividend mechanics rather than concentrating all staked WATER inside one master staking wallet.

BNB held by the vault belongs to the vault owner.

Users can claim available BNB from their own vault.

```text
WATER trading/tax activity
        ↓
WATER dividend system
        ↓
Personal staking vault
        ↓
User claims BNB
        ↓
User wallet
```

---

# Claim WATER

Users can claim earned WATER directly to their wallet.

Example:

```text
Flexible principal     100,000 WATER
Locked principal        50,000 WATER
Claimable WATER          4,200 WATER
```

The claim does not require the user to withdraw their principal.

---

# Partial Claims

Reward management is not all-or-nothing.

A user can claim only part of their available WATER.

Example:

```text
Claimable WATER: 25,000

Claim:           10,000
Leave/compound:  15,000
```

The remaining reward continues to belong to the position until it is later claimed, compounded or otherwise handled under the staking rules.

---

# Compound WATER

Earned WATER can be compounded back into staking.

The destination is explicit.

```text
compound WATER → Flexible

or

compound WATER → Locked
```

The user chooses where the compounded WATER goes.

The staking controller does not silently move an existing Flexible balance into Locked staking.

### Compounding into Flexible

Adds the selected reward amount to Flexible principal.

### Compounding into Locked

Adds the selected reward amount to an existing Locked position.

Compounding rewards into Locked does **not** restart the existing Locked expiry.

Once a liquid reward is compounded into Locked principal, that compounded WATER becomes subject to the existing Locked position.

---

# Compound BNB Into WATER

BNB held by a personal vault can also be compounded.

The current system uses a controlled, approved swap-adapter architecture.

```text
Vault BNB
   ↓
Approved BNB→WATER adapter
   ↓
Pancake-compatible swap
   ↓
WATER returned for staking
   ↓
Flexible or Locked destination
```

The user supplies minimum-output/deadline protections for the swap path.

The destination pool is explicit:

```text
BNB → WATER → Flexible

or

BNB → WATER → Locked
```

The adapter is governed separately and cannot be arbitrarily replaced by the maintenance operator.

---

# Adding New WATER to an Existing Locked Position

A direct new-wallet top-up into an active Locked position is different from compounding rewards.

When the user explicitly adds fresh WATER to their active Locked position, the **Locked position's 30-day expiry restarts**.

Only the Locked position is affected.

Example:

```text
Flexible: 100,000 WATER
Locked:    50,000 WATER
Expiry:    12 days remaining
```

User adds:

```text
20,000 fresh WATER → Locked
```

Result:

```text
Flexible: 100,000 WATER   ← unchanged
Locked:    70,000 WATER
Expiry:    new 30-day Locked period
```

---

# Explicit Re-Lock

Flexible WATER is never automatically converted to Locked WATER.

To move Flexible principal into Locked staking, the user must explicitly select the amount.

Example:

```text
Flexible: 100,000 WATER
Locked:    50,000 WATER
```

User chooses:

```text
Re-lock 25,000 WATER
```

Result:

```text
Flexible: 75,000 WATER
Locked:   75,000 WATER
```

Only the selected amount moves.

---

# Locked Expiry

At the end of the 30-day Locked period, the Locked principal becomes Flexible.

```text
Before expiry

Flexible: 100,000 WATER
Locked:    70,000 WATER

          ↓ 30-day expiry

After synchronization

Flexible: 170,000 WATER
Locked:         0 WATER
```

Existing Flexible WATER remains Flexible throughout the process.

Only the expired Locked principal is rolled into Flexible.

The rollover is synchronized when the position is processed by the protocol, such as through user interaction or maintenance synchronization.

The blockchain timestamp determines whether the lock has expired.

---

# Locked Emergency Exit

Locked principal normally cannot be withdrawn before expiry.

The current protocol also provides a voluntary early Locked exit.

### Early Locked exit

```text
Locked principal
│
├── 95% → user
│
└──  5% → protocol penalty inventory
```

The exact penalty calculation uses basis points:

```text
5% = 500 BPS
```

### On a voluntary early Locked exit

**95% of Locked principal returns to the user**

**5% of Locked principal becomes tracked penalty WATER**

**Unclaimed Locked WATER staking rewards are forfeited**

**Available BNB belonging to the vault is returned to the user with no 5% BNB penalty**

**Flexible principal and Flexible reward accounting remain untouched**

This makes the emergency exit specific to the Locked side of the user's vault.

---

# Penalty WATER Is Tracked Separately

Early-exit penalty WATER is explicitly tracked by the staking controller.

It is not treated as a new staking reward and it is not mixed with active user liabilities.

The protocol owner can recover the tracked penalty inventory.

The current WATER token supports a real owner `manualBurn()` function, allowing recovered penalty WATER to be permanently removed from total supply.

```text
5% early-exit penalties
        ↓
Staking controller
        ↓
Tracked penalty WATER
        ↓
Owner recovery
        ↓
WATER manual burn
        ↓
Total supply reduced
```

---

# Forfeited Locked Rewards

The forfeited WATER reward on an early Locked exit is different from the 5% principal penalty.

Example:

```text
Locked principal:         100,000 WATER
Unclaimed Locked reward:   12,000 WATER
```

Early exit:

```text
95,000 WATER principal → user

5,000 WATER principal  → penalty inventory

12,000 unclaimed Locked reward
→ forfeited from that user's Locked reward entitlement
```

The user's Flexible side remains independent.

---

# Claim BNB

BNB stored by the personal vault can be claimed by the vault owner.

The maintenance operator does not become the destination for user BNB.

The user remains the beneficiary of their vault's BNB.

---

# A Finite, Funded Reward System

WATER rewards are funded before they are emitted.

The controller accounts for:

```text
Pool budget
Active emission rate
Accrued user liabilities
Remaining reserve
Unused finished-program rewards
```

Reward reserves are separate from user principal because user principal remains inside personal vaults.

The controller includes reserve-solvency checks so active reward liabilities cannot simply be treated as owner-recoverable excess WATER.

This is not a system where new users' deposits are used to pay existing users.

---

# Finished Reward Programs

When a reward program finishes, the protocol can determine what portion of the funded reward budget is genuinely unused.

Owner recovery is limited so that outstanding user liabilities remain protected.

Conceptually:

```text
Finished pool budget
        -
Outstanding user reward liabilities
        =
Safely recoverable unused reward budget
```

Active user liabilities are not included in that recoverable amount.

---

# The Staking Controller Does Not Hold User Principal

This is one of the key architectural differences.

```text
STAKING CONTROLLER
│
├── reward accounting
├── reward reserves
├── pool schedules
├── expiry synchronization
├── penalty accounting
└── protocol controls

USER VAULTS
│
├── User A principal
├── User B principal
├── User C principal
└── User D principal
```

User staking principal is held by the user's personal vault rather than pooled as custody inside the controller.

---

# Current Contract Architecture

The developed system is modular.

```text
WATER TOKEN
(non-upgradeable)
        │
        │
        ▼
STABLE ERC1967 PROXY
        │
        ▼
WATER STAKING CONTROLLER
(UUPS upgradeable)
        │
        ├── WATER Staking Lens
        │     └── read-only reward/account views
        │
        ├── Vault Factory
        │     └── deterministic personal vault deployment
        │
        ├── Adapter Registry
        │     └── approved BNB→WATER swap adapters
        │
        └── UpgradeableBeacon
              │
              ├── BeaconProxy User Vault A
              ├── BeaconProxy User Vault B
              ├── BeaconProxy User Vault C
              └── BeaconProxy User Vault D
```

The WATER token itself remains non-upgradeable.

The staking controller can be upgraded through its stable UUPS/ERC1967 proxy.

All personal vaults use deterministic BeaconProxy instances backed by a shared UpgradeableBeacon.

This allows future vault functionality to evolve without changing each user's permanent vault address.

---

# Upgradeability and Governance

Upgrade authority and maintenance authority are intentionally separated.

## OWNER

The OWNER controls governance-sensitive actions such as:

- controller upgrades;
- vault beacon upgrades;
- adapter governance;
- reward funding/recovery controls;
- protocol ownership transfers.

During testing, the deployer hot wallet can remain OWNER.

Before production governance is finalized, ownership can be explicitly transferred to the intended multisig/timelock structure.

---

## OPERATOR

The OPERATOR is maintenance-only.

The operator can perform approved maintenance/synchronization tasks and protocol operations that are deliberately delegated to that role.

The operator **cannot**:

- upgrade the controller;
- upgrade the vault beacon;
- take ownership of user vaults;
- redirect user BNB;
- withdraw user principal to itself; or
- replace governance-controlled swap adapters.

The operator is not a second owner.

---

# Read-Only Staking Lens

The protocol separates many dashboard calculations from the controller runtime.

The WATER Staking Lens provides read-only views such as:

```text
Current Flexible claimable WATER
Current Locked claimable WATER
Flexible principal
Locked principal
Locked expiry
Pool totals
Reward reserves
Recoverable unused rewards
Controller WATER accounting
```

This keeps the core controller smaller while giving the frontend detailed live information.

---

# Why the System Is Modular

The staking controller originally contained too much logic for the EVM deployment-size limit.

The developed architecture separates the system into focused contracts while preserving a stable staking-controller address.

Benefits include:

- smaller deployable runtime contracts;
- stable user-facing controller address;
- permanent vault addresses;
- upgradeable controller logic;
- upgradeable shared vault logic;
- separate read-only Lens;
- separate vault deployment module;
- separate swap-adapter governance;
- clearer authority boundaries.

---

# Protocol Emergency Mode

The voluntary 95/5 Locked early exit is not the same thing as a catastrophic protocol emergency.

The system also maintains a separate emergency architecture for protocol-level shutdown/recovery conditions.

A voluntary early Locked exit applies the normal 5% Locked penalty.

A protocol emergency path is intended as a last-resort safety mechanism rather than a normal staking feature.

---

# Staking Lifecycle

## 1. Connect Wallet

Connect a supported BNB Smart Chain wallet.

## 2. Personal Vault

The first stake creates the user's permanent deterministic personal vault.

## 3. Choose Position

The user chooses:

```text
Flexible

or

Locked — 30 days
```

The same vault can contain both simultaneously.

## 4. Earn

The vault can participate in:

```text
Eligible BNB dividends

+

WATER staking rewards
```

## 5. Monitor

The dashboard can read live information through the Lens:

```text
Vault address
Flexible principal
Locked principal
Lock expiry
Claimable WATER
Available BNB
Flexible pool share
Locked pool share
Reward rates
Reward reserves
```

## 6. Manage Rewards

The user can:

```text
Claim WATER

Claim BNB

Compound WATER → Flexible

Compound WATER → Locked

Compound BNB → WATER → Flexible

Compound BNB → WATER → Locked
```

## 7. Manage Principal

Flexible WATER can be withdrawn.

Flexible WATER can be explicitly re-locked by selecting an amount.

Locked WATER becomes Flexible after its 30-day expiry.

Fresh Locked top-ups restart only the Locked expiry.

Locked users also have the optional 95/5 voluntary early-exit path.

---

# What Has Been Tested

The developed system is no longer only a staking concept.

It has been exercised using both BSC testnet rehearsals and an isolated accelerated private EVM simulation environment.

The private simulation deploys the actual current WATER/staking contracts with a local Pancake-compatible AMM and advances blockchain timestamps without changing the production timing constants.

A completed accelerated smoke run exercised:

```text
12 deterministic users
7 simulated days
195 successful transactions
0 failed transactions
24 buys
8 sells
Flexible staking
Locked staking
WATER rewards
WATER claiming
WATER compounding
BNB claiming
BNB compounding
95/5 Locked emergency exit
WATER penalty burn
BNB reflections
auto-liquidity
continuous accounting/security invariants
```

The simulation completed with **zero invariant failures**.

---

# Core Rules

The current protocol can be summarized with these rules:

### 1. Personal vaults hold user principal

The controller does not pool everyone's staking principal into one wallet.

### 2. Flexible and Locked are independent

A user can have both at once.

### 3. Locked is currently 30 days

There are no conceptual 90 / 180 / 365-day multiplier tiers in the current implementation.

### 4. Locked advantage comes from its reward pool

The protocol uses separately funded Flexible and Locked reward pools rather than arbitrary reward multipliers.

### 5. Flexible is never silently locked

Moving Flexible principal into Locked requires an explicit user-selected amount.

### 6. Locked expiry moves only Locked principal

Expired Locked WATER rolls into Flexible without changing pre-existing Flexible principal.

### 7. Rewards remain manageable during a lock

Locked principal is locked, not every reward action.

Users can still claim or compound rewards according to the active protocol rules.

### 8. Early Locked exit is available

95% principal returns to the user, 5% becomes tracked penalty WATER, Locked WATER rewards are forfeited, and eligible BNB is returned without the 5% penalty.

### 9. Staking rewards are funded

Reward reserves and user liabilities are explicitly accounted for.

### 10. Upgrade and maintenance authority are separate

OWNER governs upgrades.

OPERATOR performs maintenance only.

---

# One Vault. Two Positions. Two Ways to Earn.

The current WATER Staking system is designed around one simple idea:

### Hold WATER

**Eligible BNB dividends**

### Flexible Stake WATER

**Eligible BNB dividends + Flexible WATER rewards**

### Lock WATER for 30 Days

**Eligible BNB dividends + Locked-pool WATER rewards**

All while keeping each user's staking principal inside their own permanent on-chain vault.

```text
WATER HOLDER
     │
     ▼
PERSONAL VAULT
     │
     ├── FLEXIBLE WATER
     │      +
     │   WATER rewards
     │
     └── LOCKED WATER
            +
         WATER rewards

     BOTH POSITIONS
           +
   ELIGIBLE BNB DIVIDENDS
```



## Live Tools & Testing

### WATER Simulator
[Open WATER Simulator](https://water-simulator.hausserver.xyz)

### STAKING Simulator
[Open STAKING Simulator](https://water-staking-simulator.hausserver.xyz)

### Staking Contract Tests
[Open Staking Contract Tests](https://water-stake-ca-tests-app1.hausserver.xyz)

### WATER Staking Calculator
[Open WATER Calculator](https://water-calcs.hausserver.xyz)

### WATER Testnet Faucet
[Open WATER Testnet Faucet](https://water-faucet.hausserver.xyz/)


### Brand Assets Page 
[Open Design Assets Page](https://water-assets.hausserver.xyz)


