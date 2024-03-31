import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_INFURA_RPC_URL ?? "",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [process.env.LOCALHOST_PRIVATE_KEY ?? ""],
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY ?? "",
    token: "ARB",
  },
};

export default config;
