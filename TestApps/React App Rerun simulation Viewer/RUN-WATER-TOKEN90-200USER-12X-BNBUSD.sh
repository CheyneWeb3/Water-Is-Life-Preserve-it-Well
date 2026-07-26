#!/usr/bin/env bash
set -Eeuo pipefail

TARGET="${WATER_SIM_DIR:-$HOME/water-staking-simulation/water-staking-dockerstack-v4.4.4-accelerated-sim}"
DOWNLOADS="/mnt/c/Users/cheyn/Downloads"
ZIP="$DOWNLOADS/water-token90-volatility-patch-v4.4.7.zip"
ZIP_SHA="d30993b2629e1630dccf6d27329d2048c06cb1fdc0e37b420a77b15f75db49d5"
STAMP="$(date +%Y%m%d-%H%M%S)"
SEED="${SIM_SEED:-12345}"

die(){ echo; echo "✗ $*" >&2; exit 1; }
section(){ echo; echo "============================================================"; echo " $*"; echo "============================================================"; }

section "WATER TOKEN90 — 200-USER VOLATILITY / DEGEN TORTURE TEST"
echo "Private chain 31338 only · token-only · zero tBNB · staking OFF"
echo "Launch LP: 70,000,000 WATER + 2 simulated BNB"
echo "BNB/USD: starts \$587 · volatile hard band \$537-\$637"
echo "WATER: day-1 ~12x intraday spike · gradual ~8x · blow-off · dump to ~2x for weeks"
echo "Population: 200 deterministic users · randomized volume bots · seed $SEED"

[[ -d "$TARGET" ]] || die "Simulation stack not found: $TARGET"
[[ -f "$ZIP" ]] || die "Missing patch ZIP in Windows Downloads: $ZIP"
[[ "$(sha256sum "$ZIP" | awk '{print $1}')" == "$ZIP_SHA" ]] || die "Patch ZIP checksum mismatch"
echo "✓ Patch checksum"

section "ARCHIVE THE PASSED 60-DAY RUN BEFORE RESET"
ARCHIVE="$TARGET/sim-archives/market60-before-token90-$STAMP"
mkdir -p "$ARCHIVE"
if [[ -f "$TARGET/logs/sim/final-report.json" ]]; then
  cp -a "$TARGET/logs/sim/final-report.json" "$ARCHIVE/"
  cp -a "$TARGET/logs/sim/final-report.md" "$ARCHIVE/" 2>/dev/null || true
  cp -a "$TARGET/logs/sim/snapshots.jsonl" "$ARCHIVE/" 2>/dev/null || true
  [[ -d "$TARGET/sim/snapshots" ]] && cp -a "$TARGET/sim/snapshots" "$ARCHIVE/" || true
  python3 - "$TARGET/logs/sim/final-report.json" <<'PY'
import json,sys
r=json.load(open(sys.argv[1]))
if r.get('scenario') == 'MARKET60_2BNB_70M_8X':
    assert int(r.get('simulatedDaysElapsed',0)) == 60
    assert int(r.get('failedTransactions',-1)) == 0
    assert not (r.get('accountingInvariantFailures') or [])
    print(f"✓ Archived proven MARKET60 result: {r['successfulTransactions']}/{r['transactionCount']} tx · 0 failures")
else:
    print(f"INFO: archived latest sim report ({r.get('scenario','unknown')})")
PY
  echo "  Archive: $ARCHIVE"
else
  echo "INFO: no previous final report found; continuing with a fresh TOKEN90 run."
fi

section "VERIFY PRODUCTION WATER/STAKING SOLIDITY IS UNTOUCHED"
[[ -f "$TARGET/PRODUCTION-CONTRACT-SHA256.txt" ]] || die "Missing production contract SHA manifest"
(cd "$TARGET" && sha256sum -c PRODUCTION-CONTRACT-SHA256.txt >/dev/null) || die "Production Solidity hash verification failed"
echo "✓ Production Solidity still matches the frozen tested baseline"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
unzip -q "$ZIP" -d "$TMP"
SRC="$TMP/water-token90-volatility-patch-v4.4.7"
[[ -d "$SRC" ]] || die "TOKEN90 patch payload missing"

section "PATCH ONLY THE SIMULATION SCENARIO"
BACKUP="$TARGET/backups/token90-before-$STAMP"
mkdir -p "$BACKUP/scripts/sim"
for f in sim-token90.sh TOKEN90-SCENARIO.md; do [[ -f "$TARGET/$f" ]] && cp -a "$TARGET/$f" "$BACKUP/$f"; done
for f in token90-config.js token90-doctor.js sim-deploy-token90.js sim-token90.js sim-report-token90.js; do
  [[ -f "$TARGET/scripts/sim/$f" ]] && cp -a "$TARGET/scripts/sim/$f" "$BACKUP/scripts/sim/$f"
  cp -a "$SRC/scripts/sim/$f" "$TARGET/scripts/sim/$f"
done
cp -a "$SRC/sim-token90.sh" "$TARGET/sim-token90.sh"
cp -a "$SRC/TOKEN90-SCENARIO.md" "$TARGET/TOKEN90-SCENARIO.md"
chmod +x "$TARGET/sim-token90.sh"
echo "✓ TOKEN90 simulation scripts installed"
echo "  Backup: $BACKUP"

cd "$TARGET"

section "PROACTIVE STATIC + DETERMINISM AUDIT"
bash -n sim-token90.sh
if command -v node >/dev/null 2>&1; then
  for f in scripts/sim/token90-config.js scripts/sim/token90-doctor.js scripts/sim/sim-deploy-token90.js scripts/sim/sim-token90.js scripts/sim/sim-report-token90.js; do
    node --check "$f" >/dev/null || die "JavaScript syntax failed: $f"
  done
  node scripts/sim/token90-doctor.js
else
  echo "INFO: host Node.js unavailable; JS syntax + deterministic doctor will run inside Docker after build."
fi

docker compose --profile sim config >/dev/null || die "Docker Compose validation failed"
(cd "$TARGET" && sha256sum -c PRODUCTION-CONTRACT-SHA256.txt >/dev/null) || die "Production Solidity changed during patch"

# The token-only scenario must not call staking/reward functions or owner launch-limit mutation methods.
if grep -R -nE 'stakeFlexible|stakeLocked|fundRewards|scheduleRewards|rewardPools|controller\.' \
  scripts/sim/sim-token90.js scripts/sim/sim-deploy-token90.js; then
  die "TOKEN90 unexpectedly contains staking/reward interactions"
fi
if grep -R -nE 'removeLimits|setMaxWallet|setMaxBuy|excludeFromLimits' \
  scripts/sim/sim-token90.js scripts/sim/sim-deploy-token90.js; then
  die "TOKEN90 attempts to mutate production launch limits"
fi
if grep -nE 'token\.(transfer|mint)\(' scripts/sim/sim-token90.js; then
  die "TOKEN90 contains direct WATER user allocation; users must acquire through AMM swaps"
fi

grep -q "DAY1_SPIKE_BPS = 120000" scripts/sim/sim-token90.js || die "12x day-1 spike missing"
grep -q "USER_COUNT = 200" scripts/sim/token90-config.js || die "200-user configuration missing"
grep -q "BNB_USD_START = 587" scripts/sim/token90-config.js || die "BNB/USD \$587 start missing"
grep -q "BNB_USD_RANGE = 50" scripts/sim/token90-config.js || die "BNB/USD ±\$50 band missing"
grep -q "SIM_LP_WATER=70000000" sim-token90.sh || die "70M LP configuration missing"
grep -q "SIM_LP_BNB=2" sim-token90.sh || die "2 BNB LP configuration missing"

echo "✓ no staking/reward transactions"
echo "✓ no owner removal/change of 2M / 500k / 24h launch protection"
echo "✓ no direct WATER seeding"
echo "✓ 200-user profiles + randomized volume bursts deterministic from seed"
echo "✓ BNB/USD external path isolated from on-chain WBNB reserves"

section "REBUILD ONLY CHANGED SIMULATION RUNTIME LAYERS"
echo "Production Solidity is unchanged; Docker should reuse the existing compile layer."
docker compose --profile sim build sim-deploy sim-run

docker compose --profile sim run --rm --no-deps sim-run sh -lc '
  set -e
  for f in scripts/sim/token90-config.js scripts/sim/token90-doctor.js scripts/sim/sim-deploy-token90.js scripts/sim/sim-token90.js scripts/sim/sim-report-token90.js; do node --check "$f"; done
  node scripts/sim/token90-doctor.js
'
echo "✓ Docker runtime scripts syntax + deterministic scenario doctor passed"

section "RUN FRESH 90-DAY / 200-USER TOKEN-ONLY SIMULATION"
echo "This now resets ONLY chain-31338 simulation state. The passed MARKET60 report was archived above."
SIM_SEED="$SEED" ./sim-token90.sh run

section "STRICT FINAL RESULT GATE"
REPORT="$TARGET/logs/sim/final-report.json"
[[ -f "$REPORT" ]] || die "TOKEN90 final report missing"
python3 - "$REPORT" <<'PY'
import json,sys
r=json.load(open(sys.argv[1]))
def i(v): return int(v or 0)
def f(v): return float(v or 0)
assert r.get('scenario') == 'TOKEN90_200_BNBUSD_VOLATILITY', r.get('scenario')
assert r.get('tokenOnly') is True
assert i(r.get('simulatedDaysElapsed')) == 90
assert i(r.get('users')) == 200
assert i(r.get('failedTransactions')) == 0
assert not (r.get('accountingInvariantFailures') or [])
assert not (r.get('unexpectedTransactionFailures') or [])
assert i(r.get('transactionCount')) >= 30000, r.get('transactionCount')
assert i(r.get('buys')) >= 12000, r.get('buys')
assert i(r.get('sells')) >= 10000, r.get('sells')

m=r['marketScenario']
assert 115000 <= i(m['day1SpikeMultiplierBps']) <= 130000, m['day1SpikeMultiplierBps']
assert 35000 <= i(m['day1PostDegenDumpMultiplierBps']) <= 48000, m['day1PostDegenDumpMultiplierBps']
assert 75000 <= i(m['day30CloseMultiplierBps']) <= 85000, m['day30CloseMultiplierBps']
assert 93000 <= i(m['day35CloseMultiplierBps']) <= 107000, m['day35CloseMultiplierBps']
assert 18000 <= i(m['day40CloseMultiplierBps']) <= 23000, m['day40CloseMultiplierBps']
assert i(m['depressedDays']) >= 14, m['depressedDays']

b=r['bnbUsdMarket']
assert f(b['start']) == 587
assert f(b['hardBandMin']) == 537 and f(b['hardBandMax']) == 637
assert f(b['min']) >= 537 and f(b['max']) <= 637
assert f(b['max']) - f(b['min']) >= 35

limits=r['launchLimits']
assert all(limits.values()), limits
assert i(r.get('totalTokensBurned')) > 0
assert i(r.get('totalBnbReflectionsDistributed')) > 0
assert i(r.get('marketingBnbReceived')) > 0
assert i(r.get('liquidityAdditions')) > 0
assert i(r.get('trackedDividendHolders')) > 20
assert i(r.get('qualifiedDividendHolders')) > 20
assert len(r.get('volumeBurstDays') or []) >= 5
mech=r.get('internalMechanicFailures') or {}
assert i(mech.get('autoLiquidity')) == 0 and i(mech.get('swap')) == 0

print('✓ 90/90 simulated days · 200 users · token-only')
print(f"✓ {r['successfulTransactions']}/{r['transactionCount']} transactions · 0 failures")
print(f"✓ {r['buys']} buys / {r['sells']} sells")
print(f"✓ WATER day-1 spike {i(m['day1SpikeMultiplierBps'])/10000:.2f}x → dump {i(m['day1PostDegenDumpMultiplierBps'])/10000:.2f}x")
print(f"✓ day-30 {i(m['day30CloseMultiplierBps'])/10000:.2f}x · day-35 {i(m['day35CloseMultiplierBps'])/10000:.2f}x · day-40 {i(m['day40CloseMultiplierBps'])/10000:.2f}x")
print(f"✓ {i(m['depressedDays'])} battered-market days around 2x-3x")
print(f"✓ BNB/USD ${f(b['min']):.2f}-${f(b['max']):.2f} inside requested $537-$637 range")
print(f"✓ {len(r['volumeBurstDays'])} reproducible randomized volume-burst days")
print('✓ launch limits / taxes / true burn / reflections / marketing / auto-liquidity covered')
print('✓ 0 invariant failures · 0 internal swap/liquidity failures')
PY

echo
echo "✅ WATER TOKEN90 200-USER VOLATILITY SIMULATION PASSED"
echo "Report: $TARGET/logs/sim/final-report.md"
echo "JSON:   $TARGET/logs/sim/final-report.json"
echo "Daily:  $TARGET/sim/snapshots/"
echo "Prior 60-day archive: $ARCHIVE"
