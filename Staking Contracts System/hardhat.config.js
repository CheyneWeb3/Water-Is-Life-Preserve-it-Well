require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

const networks = {};

if (process.env.BSC_TESTNET_RPC_URL && process.env.DEPLOYER_PRIVATE_KEY) {
  networks.bscTestnet = {
    url: process.env.BSC_TESTNET_RPC_URL,
    chainId: 97,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY]
  };
}

if (process.env.BSC_MAINNET_RPC_URL && process.env.DEPLOYER_PRIVATE_KEY) {
  networks.bsc = {
    url: process.env.BSC_MAINNET_RPC_URL,
    chainId: 56,
    accounts: [process.env.DEPLOYER_PRIVATE_KEY]
  };
}

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: { enabled: true, runs: 500 }
    }
  },
  networks,
  mocha: { timeout: 120000 }
};
