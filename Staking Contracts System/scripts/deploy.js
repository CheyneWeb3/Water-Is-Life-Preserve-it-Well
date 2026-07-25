const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function parseRoute(wbnb, water) {
  const configured = process.env.PANCAKE_V2_PATH;
  if (!configured) return [wbnb, water];
  const route = configured.split(",").map((v) => v.trim()).filter(Boolean);
  if (route.length < 2) throw new Error("PANCAKE_V2_PATH must contain at least WBNB,WATER");
  return route;
}

async function main() {
  const waterAddress = required("WATER_ADDRESS");
  const [deployer] = await ethers.getSigners();

  const Controller = await ethers.getContractFactory("WaterStakingController");
  const controller = await Controller.deploy(waterAddress);
  await controller.waitForDeployment();

  const controllerAddress = await controller.getAddress();
  console.log("Deployer:", deployer.address);
  console.log("WATER:", waterAddress);
  console.log("Controller:", controllerAddress);
  console.log("Vault implementation:", await controller.vaultImplementation());
  console.log("Flexible pool ID:", Number(await controller.FLEXIBLE_POOL()));
  console.log("Locked pool ID:", Number(await controller.LOCKED_POOL()));
  console.log("Minimum lock seconds:", Number(await controller.LOCK_DURATION()));
  console.log("Daily epoch seconds:", Number(await controller.EPOCH_DURATION()));

  let adapterAddress = null;
  let adapterExecuteAfter = null;
  let adapterRoute = null;

  if (process.env.PANCAKE_V2_ROUTER && process.env.WBNB_ADDRESS) {
    adapterRoute = parseRoute(process.env.WBNB_ADDRESS, waterAddress);
    const Adapter = await ethers.getContractFactory("PancakeV2BnbWaterAdapter");
    const adapter = await Adapter.deploy(
      process.env.PANCAKE_V2_ROUTER,
      process.env.WBNB_ADDRESS,
      waterAddress,
      adapterRoute
    );
    await adapter.waitForDeployment();
    adapterAddress = await adapter.getAddress();

    await (await controller.proposeSwapAdapter(adapterAddress, true)).wait();
    const pending = await controller.pendingAdapterChanges(adapterAddress);
    adapterExecuteAfter = Number(pending.executeAfter);

    console.log("BNB -> WATER adapter deployed:", adapterAddress);
    console.log("Adapter route:", adapterRoute.join(" -> "));
    console.log("Adapter approval queued; executable after unix:", adapterExecuteAfter);
  }

  const finalOwner = process.env.FINAL_OWNER;
  if (finalOwner && finalOwner.toLowerCase() !== deployer.address.toLowerCase()) {
    await (await controller.transferOwnership(finalOwner)).wait();
    console.log("Controller ownership transferred to:", finalOwner);
  }

  const network = await ethers.provider.getNetwork();
  const deployment = {
    version: "2.2.0",
    chainId: Number(network.chainId),
    deployer: deployer.address,
    water: waterAddress,
    controller: controllerAddress,
    vaultImplementation: await controller.vaultImplementation(),
    pools: {
      flexible: Number(await controller.FLEXIBLE_POOL()),
      locked30d: Number(await controller.LOCKED_POOL())
    },
    lockDurationSeconds: Number(await controller.LOCK_DURATION()),
    epochDurationSeconds: Number(await controller.EPOCH_DURATION()),
    adapterChangeDelaySeconds: Number(await controller.ADAPTER_CHANGE_DELAY()),
    bnbWaterAdapter: adapterAddress,
    bnbWaterAdapterRoute: adapterRoute,
    adapterApprovalExecuteAfter: adapterExecuteAfter
  };

  fs.mkdirSync(path.resolve(process.cwd(), "deployments"), { recursive: true });
  const output = path.resolve(process.cwd(), "deployments", `deployment-${deployment.chainId}.json`);
  fs.writeFileSync(output, JSON.stringify(deployment, null, 2) + "\n");
  console.log("Deployment manifest:", output);

  console.log("\nIMPORTANT:");
  console.log("1. Reward funding is separate from deployment. Fund pool 0/1 with the chosen allocation (e.g. 35/65).");
  console.log("2. Call scheduleRewards(poolId, duration) for each funded pool.");
  console.log("3. If an adapter was proposed, executeSwapAdapterChange(adapter) only after the timelock has elapsed.");
  console.log("4. Exclude the reward controller from WATER dividends if WATER's dividend tracker supports exclusions.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
