# WATER Ecosystem Docker Suite v5.0.0

One repository for the current **Forbidden Oasis / WATER** token, dividend-preserving staking contracts, BSC deployment lifecycle, isolated private-EVM simulations, high-volume randomized user scenarios, replay apps, audit exports, backups, and operator tooling.

This suite is built from two verified source lines:

- **Canonical production contracts:** WATER staking V4.4.3  
  ZIP SHA-256: `00d6226394d3aa0daae7375767ddc30c297fe35e8ebb62aef235b292619c3b6f`
- **Hardened simulation foundation:** V4.4.5 accelerated private-EVM stack  
  ZIP SHA-256: `6d71040c672aa71d5034de8b233874000688d685fedbdbc5129648222db83522`

`PRODUCTION-CONTRACT-SHA256.txt` is the immutable Solidity baseline. The new simulation, replay, Docker, menu, and audit additions do **not** modify those production Solidity files.

---

## What is included

### Production / public-chain lifecycle

- WATER token (`WaterToken.sol`)
- Upgradeable staking controller (UUPS)
- Personal staking vaults behind an upgradeable beacon
- Vault factory
- Staking Lens
- Adapter registry
- Pancake V2 BNB -> WATER adapter
- Flexible + Locked staking as independent simultaneous positions
- 5% voluntary early Locked exit penalty path
- BSC Testnet chain `97` deployment, verification, diagnostics and full rehearsal
- BSC Mainnet chain `56` gated deployment and verification
- Controller and vault upgrades
- Ownership handover / multisig governance lock
- Penalty recovery and burn tooling

### Current Locked semantics

The **actual canonical production contract has one Locked pool with a minimum 30-day lock**, rounded up to the next daily epoch boundary. It then rolls to Flexible when synchronized after expiry. Long-duration staking tests therefore model users remaining staked for 1-12 months through repeated expiry/relock cycles; they do **not** invent 90/180/365-day production pools that are not in V4.4.3.

### Private EVM

Isolated chain:

```text
chain id: 31338
RPC:      http://localhost:18545
```

The simulation chain never uses a BSC RPC or production deployer key. It deploys the exact canonical WATER/staking Solidity plus simulation-only WBNB/Pancake-compatible contracts.

### Full-volume scenarios

- `meme30-a` — 30 days / 200 users / launch mania + dumps
- `meme30-b` — 30 days / 200 users / slow accumulation + capitulation
- `meme30-c` — 30 days / 200 users / maximum chaos
- `meme90-50` — 90 days / 50 users
- `year365-lifecycle` — 365 days / users join, churn, sleep and return
- `stake365-lifecycle` — 365-day staking lifecycle with 1-12 month user lifetimes

Each user receives a seeded individual profile and independent action schedule: different activity frequency, preferred hours, trade sizes, buy/sell tendency, sleep days, degen bursts, panic selling, dip buying, profit taking and whale-lite events.

The action plan is generated **before execution** and saved as:

```text
logs/sim/plans/user-profiles.jsonl
logs/sim/plans/action-plan.jsonl
logs/sim/plans/plan-summary.json
```

The private-EVM engine consumes `SIM_ACTION_PLAN_FILE`; these are real contract transactions, not frontend-generated fake trades.

### Replay / audit logs

A simulation produces replay data under:

```text
logs/sim/replay/
├── manifest.json
├── transactions.jsonl
├── trades.jsonl
├── staking-events.jsonl
├── user-snapshots.jsonl
├── global-snapshots.jsonl
└── market.mkrtape
```

Market records include WATER/BNB, WATER/USD, simulated BNB/USD, market cap, LP value, side, user, amounts, block and transaction hash. BNB/USD is a reporting-only external market layer and never changes WBNB balances or contract behavior.

### Apps

Local Docker apps:

```text
Audit Hub       http://localhost:3099
Market Replay   http://localhost:3000
Staking Replay  http://localhost:3001
```

Host ports bind to `127.0.0.1` by default.

The Market Replay app supports normal JSON/JSONL inputs and `.mkrtape` import/export. Its local-stack connector remains opt-in. When the frontend is hosted on a non-local hostname, it behaves as a standalone file replay application and does not expose the local stack connection control.

An optional Cloudflare Tunnel profile is included, but it is disabled unless you explicitly set a tunnel token and start it.

---

# 1. Fresh WSL / Linux install

Requirements:

- Docker Engine / Docker Desktop with WSL integration
- Docker Compose v2+
- Bash
- Python 3 on the host for operator wrappers

Extract the ZIP and enter it:

```bash
cd /mnt/c/Users/cheyn/Downloads
unzip -o WATER-Ecosystem-Docker-Suite-v5.0.0.zip
cd WATER-Ecosystem-Docker-Suite-v5.0.0
```

Create configuration:

```bash
cp .env.example .env
nano .env
```

Then install/build:

```bash
chmod +x water-suite stack.sh bin/*.sh
./water-suite install
```

Open the main menu anytime with:

```bash
./water-suite menu
```

---

# 2. Configuration

The supplied `.env.example` defaults to **BSC Testnet mode**:

```env
MAINNET=0
MAINNET_CONFIRM=
```

Important network defaults:

```env
BSC_TESTNET_RPC_URL=https://bsc-testnet-dataseed.bnbchain.org
BSC_MAINNET_RPC_URL=https://bsc-dataseed.bnbchain.org
PANCAKE_V2_ROUTER_TESTNET=0xD99D1c33F9fC3444f8101754aBC46c52416550D1
PANCAKE_V2_ROUTER_MAINNET=0x10ED43C718714eb63d5aA57B78B54704E256024E
```

For mainnet you must set your real:

```env
MARKETING_WALLET=0x...
OPERATOR_ADDRESS=0x...
MAINNET=1
MAINNET_CONFIRM=BSC_MAINNET_56_WATER_STAKING
```

Keep `MAINNET=0` during testnet work.

## Deployer key handling

Deployment commands use `bin/with-deployer-key.sh`.

If `secrets/deployer_private_key` does not already exist, the suite prompts interactively for the key, writes it with restrictive permissions only for the command, mounts it read-only into the Docker container, and removes it afterward.

The private simulation profile explicitly clears the deployer private key and refuses a real key.

---

# 3. Validate before doing anything expensive

```bash
./water-suite doctor
```

This checks:

- canonical production Solidity hashes
- shell syntax
- simulator JS syntax
- scenario JSON
- `SIM_ACTION_PLAN_FILE` integration
- private chain ID guard
- mainnet confirmation guard
- localhost-only replay app publication
- Compose parsing when Docker is available

Compile:

```bash
./water-suite compile
```

Run contract/system tests:

```bash
./water-suite contracts-test
```

Or use:

```bash
./water-suite test
```

---

# 4. BSC Testnet deployment

The clean deployment-only flow is:

```bash
./water-suite testnet-deploy
```

It performs:

```text
canonical hash check
→ BSC 97 preflight
→ deploy fresh WATER + staking stack
→ write deployments/deployment-97.json
→ explorer verification when configured
```

It does **not** automatically run the destructive/full rehearsal.

Run the controlled testnet rehearsal separately:

```bash
./water-suite testnet-rehearse
```

Or deploy + verify + rehearse in one command:

```bash
./water-suite testnet-all
```

Detailed Pancake buy diagnostics:

```bash
./water-suite diagnose-buy
```

Existing canonical low-budget/testnet documentation is retained in the repository, including `TESTNET-PLAN.md`, `LOW-BUDGET-REHEARSAL.md`, and `BUY-DIAGNOSTICS-V4.4.2.md`.

---

# 5. BSC Mainnet

Mainnet is deliberately harder to execute.

Set:

```env
MAINNET=1
MAINNET_CONFIRM=BSC_MAINNET_56_WATER_STAKING
MARKETING_WALLET=0xREAL_MARKETING_WALLET
OPERATOR_ADDRESS=0xREAL_OPERATOR
```

First run the **non-deploying plan**:

```bash
./water-suite mainnet-plan
```

This performs:

```text
production hash check
→ compile
→ contract/system tests
→ chain-56 preflight
```

and then stops. It does not deploy contracts.

Only after that, actual deployment is:

```bash
./water-suite mainnet-deploy
```

That uses the original guarded V4.4.x mainnet path:

```text
preflight
→ deploy WATER + staking architecture
→ deployments/deployment-56.json
→ verify
```

No test users, automated test LP, simulated trades, staking rehearsal, or cleanup scenario runs in mainnet mode.

---

# 6. Ownership, governance and upgrades

Check current ownership:

```bash
./water-suite owner-status
```

Transfer system ownership:

```bash
./water-suite handover 0xNEW_OWNER
```

Lock governance to multisig/timelock flow:

```bash
./water-suite lock-governance 0xMULTISIG
```

Upgrade the UUPS controller:

```bash
./water-suite upgrade-controller
```

Upgrade the beacon implementation used by personal vaults:

```bash
./water-suite upgrade-vaults
```

Recover and burn tracked early-exit penalties:

```bash
./water-suite burn-penalties
```

The original upgrade/ownership documentation remains available in `UPGRADE-CHECKLIST.md` and `UPGRADEABILITY-AND-OWNERSHIP.md`.

---

# 7. Original private-EVM validation tests

Fresh strict smoke run:

```bash
./water-suite sim-smoke
```

30-day lock rollover boundary test:

```bash
./water-suite sim-boundary
```

Original 365-day harness:

```bash
./water-suite sim-year
```

Status/report:

```bash
./water-suite sim-status
./water-suite sim-report
```

Destructive reset affects **only** private simulation data:

```bash
./water-suite sim-reset
```

It does not delete BSC chain-97/56 deployment manifests.

---

# 8. Full-volume market simulations

Start with:

```bash
./water-suite sim meme30-a
```

Other lanes:

```bash
./water-suite sim meme30-b
./water-suite sim meme30-c
./water-suite sim meme90-50
./water-suite sim year365-lifecycle
```

For the market-only scenarios the private deployment uses:

```text
70,000,000 WATER / 2 simulated BNB launch LP
10.5M Flexible reserve + 19.5M Locked reserve retained so the exact controller can still deploy safely
```

The external BNB/USD replay path defaults to:

```text
start $587
band  $537 – $637
```

Configure with:

```env
SIM_BNB_USD_START=587
SIM_BNB_USD_MIN=537
SIM_BNB_USD_MAX=637
```

This changes reporting only.

The one-year lane uses accelerated private-EVM time and `SIM_SPEED=CI`; actual wall time depends on host CPU and the number of real transactions. The scenario target is approximately two hours, not a fake timing guarantee.

---

# 9. Full staking lifecycle simulation

```bash
./water-suite sim stake365-lifecycle
```

This exercises users with different 1-12 month participation lifetimes using the real current staking model:

- Flexible only
- Locked only
- Flexible + Locked simultaneously
- top-ups
- WATER claims
- WATER compounds
- BNB claims
- BNB -> WATER compounds
- 30-day Locked expiry -> Flexible synchronization
- repeated relocks for long-duration stakers
- Flexible withdrawals
- voluntary emergency Locked exits
- dormant/returning users

The script retains the canonical 10M WATER / 100 simulated BNB simulation LP and 31.5M / 58.5M reward allocations for this staking-focused torture lane.

---

# 10. Windows replay exports

Every full-volume scenario is copied after completion to:

```text
C:\Users\cheyn\Downloads\WATER-SIM-REPLAYS\
```

or the value configured in:

```env
WATER_EXPORT_DIR=/mnt/c/Users/cheyn/Downloads/WATER-SIM-REPLAYS
```

A run contains:

```text
<SCENARIO>-<timestamp>/
├── scenario.json
├── market.mkrtape
├── staking.stktape              # when staking data exists
├── final-report.json
├── final-report.md
├── run-state.json
├── plans/
│   ├── user-profiles.jsonl
│   ├── action-plan.jsonl
│   └── plan-summary.json
├── replay/
│   ├── manifest.json
│   ├── transactions.jsonl
│   ├── trades.jsonl
│   ├── staking-events.jsonl
│   ├── user-snapshots.jsonl
│   ├── global-snapshots.jsonl
│   └── market.mkrtape
├── daily-snapshots/
└── SHA256SUMS.txt
```

Where `zip` exists, the suite also creates a ZIP copy of the whole run.

---

# 11. Replay / audit apps

Start:

```bash
./water-suite apps start
```

Then open:

```text
http://localhost:3099   Audit Hub
http://localhost:3000   Market Replay
http://localhost:3001   Staking Replay
```

Status/logs/rebuild:

```bash
./water-suite apps status
./water-suite apps logs
./water-suite apps rebuild
./water-suite apps stop
```

The market viewer keeps its full dataset for replay/export but uses incremental tape reads and bounded display windows to avoid the earlier full-tape redraw slowdown.

---

# 12. Optional Cloudflare Tunnel

No tunnel starts by default.

Set:

```env
CLOUDFLARE_TUNNEL_TOKEN=...
```

then:

```bash
./water-suite apps tunnel
```

Use Cloudflare ingress rules to route to the internal Docker services. A remotely hosted replay frontend stays file-oriented; local stack controls are intentionally not exposed by browser hostname logic.

---

# 13. Audit evidence

Create an evidence bundle:

```bash
./water-suite audit-export
```

It collects available:

- production-contract hash verification
- source provenance hashes
- BSC/private deployment manifests
- simulation action plan
- replay logs and tapes
- final simulation reports
- resolved Compose configuration
- Docker status/log excerpts
- SHA-256 manifest

Output is stored under `audit-exports/` as a timestamped directory and tarball.

---

# 14. Backup / restore

Backup:

```bash
./water-suite backup
```

Restore:

```bash
./water-suite restore backups/WATER-ECOSYSTEM-<timestamp>.tar.gz
```

Restore requires explicit `RESTORE_WATER` confirmation.

No command in this suite performs a global Docker prune or removes unrelated Docker resources.

---

# 15. Recommended workflow

For development/audit work:

```text
./water-suite doctor
        ↓
./water-suite contracts-test
        ↓
./water-suite sim-smoke
        ↓
./water-suite sim meme30-a
        ↓
open Market Replay
        ↓
./water-suite sim stake365-lifecycle
        ↓
open Staking Replay
        ↓
./water-suite audit-export
```

For public deployment:

```text
MAINNET=0
./water-suite testnet-deploy
        ↓
./water-suite testnet-rehearse
        ↓
review deployment + reports
        ↓
MAINNET=1 + exact confirmation
./water-suite mainnet-plan
        ↓
manual review
        ↓
./water-suite mainnet-deploy
        ↓
verify / owner-status
        ↓
multisig governance handover when ready
```

---

## Safety boundary

There are three intentionally separate worlds:

```text
BSC Testnet 97     public test deployment/rehearsal
BSC Mainnet 56     guarded production deployment
Private EVM 31338  destructive simulation/torture testing
```

Never treat a private-EVM replay as proof that a mainnet transaction occurred. Replay logs are forensic outputs of the simulation. Mainnet/testnet evidence comes from their deployment manifests and public-chain transactions.

See `docs/PROVENANCE.md` for source lineage and the retained V4.4.x documentation for contract-specific security/upgrade details.

## v5.0.1 action-plan runtime hardening

v5.0.1 fixes the first full-volume action-plan runtime regression found by MEME30-A: the planned action executor referenced `day` without binding it from the action record. The engine now validates and binds `a.day` before every planned action.

A new real private-EVM adapter smoke test executes one planned BUY and one planned SELL and verifies both appear in `trades.jsonl`:

```bash
./water-suite action-plan-smoke
```

This runtime smoke complements the static Doctor; JavaScript syntax validation alone cannot detect an unbound identifier on an execution path.


## v5.1 Test catalog and public evidence

Use `./water-suite tests` to list stable test IDs and `./water-suite run-test token7` (or another ID) to run one. Definitions live in `public/tests/catalog.json`; completed evidence lives in `public/test-runs/` and is mirrored to Windows Downloads under `WATER-SIM-REPLAYS`. The Audit Hub exposes the catalog at `http://localhost:3099/public/tests/`. Market tests create a single viewer-ready `market.mkrtape`; staking tests create `staking.stktape`. Raw JSONL remains audit evidence only.


## v5.1.2 quick-test corrections

`stake7` is now a 7-day, 200-user combined market + **Flexible-only** staking test:

- 60 Flexible stakers
- 0 Locked users
- real BUY/SELL traffic throughout the week
- WATER reflection BNB pulled into personal vaults
- BNB claim and BNB -> WATER compound coverage
- `market.mkrtape` and `staking.stktape`

The private deploy budget is valid against WATER's canonical 100,000,000 total supply:

- 70,000,000 WATER initial LP
- 29,000,000 WATER Flexible reward reserve
- 1,000,000 WATER Locked reserve (unused in STAKE7)
- total: 100,000,000 WATER

The market replay local connector also keeps the completed tape and current-live tape separate.


## v5.1.3 STAKE7 execution hardening

`stake7` now resets the private simulator **before** generating its action plan. The plan is then validated on the host and again from inside the `sim-run` container before deployment. `SIM_ACTION_PLAN_REQUIRED=1` now hard-fails when the configured plan is missing or empty, preventing a bootstrap-only run from being misreported as a scenario run.

Fresh installs also pre-create writable runtime directories so Docker bind mounts cannot silently create `logs/sim` as root-owned host paths.
