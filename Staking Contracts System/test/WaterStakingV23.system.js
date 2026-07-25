const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAY = 24 * 60 * 60;
const LOCK = 30 * DAY;
const FLEX = 0;
const LOCKED = 1;

async function increaseTime(seconds) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

async function latestTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return Number(block.timestamp);
}

async function setTimestamp(timestamp) {
  const now = await latestTimestamp();
  if (timestamp <= now) timestamp = now + 1;
  await ethers.provider.send("evm_setNextBlockTimestamp", [timestamp]);
  await ethers.provider.send("evm_mine", []);
}

describe("WATER Staking V2.3 — operator controls + daily aggregate expiry epochs", function () {
  let deployer, alice, bob, keeper, outsider;
  let water, controller;

  beforeEach(async function () {
    [deployer, alice, bob, keeper, outsider] = await ethers.getSigners();

    const Water = await ethers.getContractFactory("MockWater");
    water = await Water.deploy();
    await water.waitForDeployment();

    const Controller = await ethers.getContractFactory("WaterStakingController");
    controller = await Controller.deploy(await water.getAddress(), keeper.address);
    await controller.waitForDeployment();

    // Example only: 35/65 reward funding. The percentages are not hard-coded in Solidity.
    const flexRewards = ethers.parseEther("3500000");
    const lockRewards = ethers.parseEther("6500000");
    await water.approve(await controller.getAddress(), flexRewards + lockRewards);
    await controller.fundRewards(FLEX, flexRewards);
    await controller.fundRewards(LOCKED, lockRewards);
    await controller.scheduleRewards(FLEX, 365 * DAY);
    await controller.scheduleRewards(LOCKED, 365 * DAY);

    for (const user of [alice, bob]) {
      await water.transfer(user.address, ethers.parseEther("1000000"));
      await water.connect(user).approve(await controller.getAddress(), ethers.MaxUint256);
    }
  });

  it("keeps principal in one deterministic permanent user vault", async function () {
    const predicted = await controller.predictVault(alice.address);
    await controller.connect(alice).stakeFlexible(ethers.parseEther("1000"));
    const vault = await controller.vaultOf(alice.address);

    expect(vault).to.equal(predicted);
    expect(await water.balanceOf(vault)).to.equal(ethers.parseEther("1000"));
    expect(await water.balanceOf(await controller.getAddress())).to.equal(ethers.parseEther("10000000"));

    await controller.connect(alice).withdraw(ethers.MaxUint256);
    await controller.connect(alice).stakeFlexible(ethers.parseEther("500"));
    expect(await controller.vaultOf(alice.address)).to.equal(vault);
  });

  it("uses the funded 35/65 allocation advantage with no staking multiplier", async function () {
    await controller.connect(alice).stakeFlexible(ethers.parseEther("1000"));
    await controller.connect(bob).stakeLocked(ethers.parseEther("1000"));
    await increaseTime(10 * DAY);

    const flex = (await controller.earnedWater(alice.address))[2];
    const locked = (await controller.earnedWater(bob.address))[2];
    const ratioTimes1000 = (locked * 1000n) / flex;

    // 65/35 = 1.857..., allow small transaction timestamp skew.
    expect(ratioTimes1000).to.be.gte(1840n);
    expect(ratioTimes1000).to.be.lte(1875n);
  });

  it("never gives a fresh lock less than 30 days and rounds expiry to a daily boundary", async function () {
    const before = await latestTimestamp();
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const position = await controller.positions(alice.address);
    const unlockAt = Number(await controller.epochStart(position.unlockEpoch));

    expect(unlockAt - before).to.be.gte(LOCK);
    expect(unlockAt - before).to.be.lte(LOCK + DAY + 5);
    expect(unlockAt % DAY).to.equal(0);
  });

  it("first interaction after the expiry epoch rolls the aggregate Locked amount to Flexible once", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    await controller.connect(bob).stakeLocked(ethers.parseEther("2000"));

    const alicePosition = await controller.positions(alice.address);
    const bobPosition = await controller.positions(bob.address);
    expect(alicePosition.unlockEpoch).to.equal(bobPosition.unlockEpoch);

    const unlockAt = Number(await controller.epochStart(alicePosition.unlockEpoch));
    let lockedPool = await controller.rewardPools(LOCKED);
    expect(lockedPool.totalStaked).to.equal(ethers.parseEther("3000"));

    await setTimestamp(unlockAt + 10);

    // No transaction has performed the new-day state transition yet.
    lockedPool = await controller.rewardPools(LOCKED);
    expect(lockedPool.totalStaked).to.equal(ethers.parseEther("3000"));

    // Keeper is the first interaction in the new period and pays the aggregate expiry processing.
    await controller.connect(keeper).syncGlobalEpoch();

    lockedPool = await controller.rewardPools(LOCKED);
    const flexiblePool = await controller.rewardPools(FLEX);
    expect(lockedPool.totalStaked).to.equal(0n);
    expect(flexiblePool.totalStaked).to.equal(ethers.parseEther("3000"));
    expect(await controller.expiringLockedByEpoch(alicePosition.unlockEpoch)).to.equal(0n);

    // Individual storage is still lazy; Alice has not had to transact yet.
    const storedAlice = await controller.positions(alice.address);
    expect(storedAlice.poolId).to.equal(BigInt(LOCKED));
    const viewAlice = await controller.accountView(alice.address);
    expect(viewAlice.effectivePoolId).to.equal(BigInt(FLEX));
    expect(viewAlice.rolloverPending).to.equal(true);
  });

  it("settles a stale user as Locked before the boundary and Flexible after it", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const position = await controller.positions(alice.address);
    const unlockAt = Number(await controller.epochStart(position.unlockEpoch));

    await setTimestamp(unlockAt + 5 * DAY);
    const beforeSync = await controller.earnedWater(alice.address);
    expect(beforeSync[1]).to.be.gt(0n); // Locked earnings
    expect(beforeSync[0]).to.be.gt(0n); // Flexible earnings after expiry

    await controller.connect(alice).syncPosition(alice.address);
    const after = await controller.positions(alice.address);
    expect(after.poolId).to.equal(BigInt(FLEX));
    expect(after.unlockEpoch).to.equal(0n);

    const storedEarned = await controller.earnedWater(alice.address);
    expect(storedEarned[0]).to.be.gt(0n);
    expect(storedEarned[1]).to.be.gt(0n);
  });

  it("handles a year with no interactions using only the bounded lock horizon", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    await increaseTime(365 * DAY);

    await expect(controller.connect(keeper).syncGlobalEpoch()).to.not.be.reverted;
    expect((await controller.rewardPools(LOCKED)).totalStaked).to.equal(0n);
    expect(await controller.lastProcessedEpoch()).to.equal(await controller.currentEpoch());
  });

  it("lets locked users partially claim WATER and BNB while principal remains locked", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);

    await deployer.sendTransaction({ to: vaultAddress, value: ethers.parseEther("2") });
    await increaseTime(7 * DAY);

    const earned = await controller.earnedWater(alice.address);
    await controller.connect(alice).claimWater(earned[2] / 2n);
    await vault.connect(alice).claimBNB(ethers.parseEther("0.5"));
    expect(await ethers.provider.getBalance(vaultAddress)).to.equal(ethers.parseEther("1.5"));

    await expect(controller.connect(alice).withdraw(1n)).to.be.revertedWithCustomError(
      controller,
      "PositionLocked"
    );
  });

  it("compounding WATER increases the expiry bucket but never extends the live lock", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const before = await controller.positions(alice.address);
    const beforeScheduled = await controller.expiringLockedByEpoch(before.unlockEpoch);

    await increaseTime(10 * DAY);
    const earned = await controller.earnedWater(alice.address);
    await controller.connect(alice).compoundWater(earned[2] / 2n);

    const after = await controller.positions(alice.address);
    const afterScheduled = await controller.expiringLockedByEpoch(after.unlockEpoch);
    expect(after.unlockEpoch).to.equal(before.unlockEpoch);
    expect(after.amount).to.be.gt(before.amount);
    expect(afterScheduled).to.be.gt(beforeScheduled);
  });

  it("fresh wallet WATER top-up cancels the old expiry amount and schedules the whole position at the new expiry", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const first = await controller.positions(alice.address);
    expect(await controller.expiringLockedByEpoch(first.unlockEpoch)).to.equal(ethers.parseEther("1000"));

    await increaseTime(10 * DAY);
    await controller.connect(alice).stakeLocked(ethers.parseEther("100"));
    const second = await controller.positions(alice.address);

    expect(second.amount).to.equal(ethers.parseEther("1100"));
    expect(second.unlockEpoch).to.be.gt(first.unlockEpoch);
    expect(await controller.expiringLockedByEpoch(first.unlockEpoch)).to.equal(0n);
    expect(await controller.expiringLockedByEpoch(second.unlockEpoch)).to.equal(ethers.parseEther("1100"));
  });

  it("expired principal stays in the same vault and can remain Flexible or be explicitly re-locked", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vault = await controller.vaultOf(alice.address);
    const position = await controller.positions(alice.address);
    const unlockAt = Number(await controller.epochStart(position.unlockEpoch));

    await setTimestamp(unlockAt + 1);
    await controller.connect(alice).stakeFlexible(ethers.parseEther("100"));
    let after = await controller.positions(alice.address);
    expect(after.poolId).to.equal(BigInt(FLEX));
    expect(after.amount).to.equal(ethers.parseEther("1100"));
    expect(await controller.vaultOf(alice.address)).to.equal(vault);

    await controller.connect(alice).relock();
    after = await controller.positions(alice.address);
    expect(after.poolId).to.equal(BigInt(LOCKED));
    expect(after.unlockEpoch).to.be.gt(0n);
    expect(await water.balanceOf(vault)).to.equal(ethers.parseEther("1100"));
  });

  it("checks expiry before a BNB-only claim", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);
    await deployer.sendTransaction({ to: vaultAddress, value: ethers.parseEther("1") });

    const position = await controller.positions(alice.address);
    await setTimestamp(Number(await controller.epochStart(position.unlockEpoch)) + 1);
    await vault.connect(alice).claimBNB(ethers.parseEther("0.1"));

    const after = await controller.positions(alice.address);
    expect(after.poolId).to.equal(BigInt(FLEX));
  });

  it("timelocks adapter approval and then allows BNB compounding without changing expiry", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);
    const before = await controller.positions(alice.address);

    const Adapter = await ethers.getContractFactory("MockBnbWaterAdapter");
    const adapter = await Adapter.deploy(await water.getAddress(), ethers.parseEther("1000"));
    await adapter.waitForDeployment();
    await water.transfer(await adapter.getAddress(), ethers.parseEther("100000"));

    await controller.proposeSwapAdapter(await adapter.getAddress(), true);
    await expect(controller.executeSwapAdapterChange(await adapter.getAddress()))
      .to.be.revertedWithCustomError(controller, "AdapterChangeNotReady");
    await increaseTime(DAY + 1);
    await controller.executeSwapAdapterChange(await adapter.getAddress());

    await deployer.sendTransaction({ to: vaultAddress, value: ethers.parseEther("1") });
    const deadline = (await latestTimestamp()) + 3600;
    await vault.connect(alice).compoundBNB(
      ethers.parseEther("0.25"),
      await adapter.getAddress(),
      ethers.parseEther("250"),
      deadline
    );

    const after = await controller.positions(alice.address);
    expect(after.amount - before.amount).to.equal(ethers.parseEther("250"));
    expect(after.unlockEpoch).to.equal(before.unlockEpoch);
  });

  it("irreversible emergency shutdown lets the vault owner recover principal without controller accounting", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);
    await deployer.sendTransaction({ to: vaultAddress, value: ethers.parseEther("1") });

    await controller.activateEmergencyShutdown();
    expect(await controller.emergencyShutdown()).to.equal(true);

    const before = await water.balanceOf(alice.address);
    await vault.connect(alice).emergencyExitWater();
    expect((await water.balanceOf(alice.address)) - before).to.equal(ethers.parseEther("1000"));
    expect(await water.balanceOf(vaultAddress)).to.equal(0n);

    // BNB remains independently claimable and skips controller accounting in shutdown.
    await expect(vault.connect(alice).claimBNB(ethers.parseEther("0.25"))).to.not.be.reverted;

    await expect(controller.connect(alice).withdraw(1n)).to.be.revertedWithCustomError(
      controller,
      "EmergencyShutdownActive"
    );
  });

  it("recovers only controller WATER above the funded reward reserves", async function () {
    const controllerAddress = await controller.getAddress();
    await water.transfer(controllerAddress, ethers.parseEther("123"));
    expect(await controller.rewardReserveRequired()).to.equal(ethers.parseEther("10000000"));

    const before = await water.balanceOf(deployer.address);
    await controller.recoverExcessControllerWater(deployer.address, ethers.MaxUint256);
    expect((await water.balanceOf(deployer.address)) - before).to.equal(ethers.parseEther("123"));
    expect(await water.balanceOf(controllerAddress)).to.equal(ethers.parseEther("10000000"));
  });

  it("recovers only WATER accidentally sent to a vault above accounted principal", async function () {
    await controller.connect(alice).stakeFlexible(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);

    await water.connect(alice).transfer(vaultAddress, ethers.parseEther("25"));
    await controller.connect(alice).recoverUnaccountedWater(ethers.MaxUint256);

    expect(await water.balanceOf(vaultAddress)).to.equal(ethers.parseEther("1000"));
    expect((await controller.positions(alice.address)).amount).to.equal(ethers.parseEther("1000"));
  });

  it("separates OWNER governance from OPERATOR server maintenance", async function () {
    expect(await controller.operator()).to.equal(keeper.address);

    await expect(controller.connect(outsider).runMaintenance([]))
      .to.be.revertedWithCustomError(controller, "NotOperatorOrOwner");

    await expect(controller.connect(keeper).runMaintenance([])).to.not.be.reverted;

    // Operator can control routine feature switches.
    await controller.connect(keeper).setFeatureEnabled(await controller.FEATURE_LOCKED_STAKING(), false);
    await expect(controller.connect(alice).stakeLocked(ethers.parseEther("1")))
      .to.be.revertedWithCustomError(controller, "FeatureDisabled");

    await controller.connect(keeper).setFeatureEnabled(await controller.FEATURE_LOCKED_STAKING(), true);
    await expect(controller.connect(alice).stakeLocked(ethers.parseEther("1"))).to.not.be.reverted;

    // But the operator cannot invoke OWNER-only economic/custody administration.
    await expect(controller.connect(keeper).scheduleRewards(FLEX, DAY))
      .to.be.revertedWith("Ownable: caller is not the owner");
    await expect(controller.connect(keeper).activateEmergencyShutdown())
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("operator maintenance can settle expiries but cannot withdraw a user's vault", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);
    const position = await controller.positions(alice.address);
    const unlockAt = Number(await controller.epochStart(position.unlockEpoch));

    await setTimestamp(unlockAt + 1);
    await controller.connect(keeper).runMaintenance([alice.address]);
    expect((await controller.positions(alice.address)).poolId).to.equal(BigInt(FLEX));

    await expect(vault.connect(keeper).emergencyExitWater())
      .to.be.revertedWithCustomError(vault, "NotOwner");
  });

  it("only the vault owner can use emergency principal exit, and WATER can only return to that owner", async function () {
    await controller.connect(alice).stakeLocked(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);

    await controller.activateEmergencyShutdown();

    await expect(vault.connect(keeper).emergencyExitWater())
      .to.be.revertedWithCustomError(vault, "NotOwner");
    await expect(vault.connect(deployer).emergencyExitWater())
      .to.be.revertedWithCustomError(vault, "NotOwner");

    const beforeAlice = await water.balanceOf(alice.address);
    await vault.connect(alice).emergencyExitWater();
    expect((await water.balanceOf(alice.address)) - beforeAlice).to.equal(ethers.parseEther("1000"));
    expect(await water.balanceOf(vaultAddress)).to.equal(0n);
  });

  it("operator can disable BNB compounding without blocking BNB claims", async function () {
    await controller.connect(alice).stakeFlexible(ethers.parseEther("1000"));
    const vaultAddress = await controller.vaultOf(alice.address);
    const vault = await ethers.getContractAt("WaterStakingVault", vaultAddress);
    await deployer.sendTransaction({ to: vaultAddress, value: ethers.parseEther("1") });

    await controller.connect(keeper).setFeatureEnabled(await controller.FEATURE_BNB_COMPOUNDING(), false);
    expect(await controller.bnbCompoundingEnabled()).to.equal(false);

    await expect(vault.connect(alice).claimBNB(ethers.parseEther("0.1"))).to.not.be.reverted;

    await expect(vault.connect(alice).compoundBNB(
      ethers.parseEther("0.1"),
      ethers.ZeroAddress,
      0,
      (await latestTimestamp()) + 3600
    )).to.be.revertedWithCustomError(vault, "BnbCompoundingDisabled");
  });

  it("operator routine pause never disables claims or Flexible withdrawals", async function () {
    await controller.connect(alice).stakeFlexible(ethers.parseEther("1000"));
    await increaseTime(7 * DAY);

    await controller.connect(keeper).pauseStaking();
    await expect(controller.connect(alice).stakeFlexible(ethers.parseEther("1"))).to.be.revertedWith("Pausable: paused");

    const earned = await controller.earnedWater(alice.address);
    await expect(controller.connect(alice).claimWater(earned[2] / 2n)).to.not.be.reverted;
    await expect(controller.connect(alice).withdraw(ethers.parseEther("100"))).to.not.be.reverted;

    await controller.connect(keeper).unpauseStaking();
    await expect(controller.connect(alice).stakeFlexible(ethers.parseEther("1"))).to.not.be.reverted;
  });

});
