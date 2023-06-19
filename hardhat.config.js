require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-network-helpers");
require("@nomiclabs/hardhat-etherscan");
//require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  mocha: {
    timeout: 3600000,
    color: true,
    failZero: Boolean(process.env.CI),
    forbidOnly: Boolean(process.env.CI),
    reporter: "mocha-multi-reporters",
    reporterOption: {
      "reporterEnabled": "spec, mocha-junit-reporter",
      "mochaJunitReporterReporterOptions": {
        mochaFile: "test-results.[hash].xml",
        "includePending": true,
        "outputs": true
      }
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
  },
 // const hex = utf8ToHex(EVM_PRIVATE_KEY ?? '');
  defaultNetwork:"hedera",
  networks: {
    hedera: { // hedera testnet RPC
      url:  "https://testnet.hedera.com",
      //url : "https://pool.arkhia.io/hedera/testnet/json-rpc/v1/7c0AHt21BVc4iLfL1b1Lcfac0YabfBcA",
     //EVM_PRIVATE_KEY
     // account:[process.env.EVM_PRIVATE_KEY], //.toString(),
        accounts:EVM_PRIVATE_KEY.fromString('0x6ee12044746e528d617d77261c9a9a4a288ef0a8142889b7a781093166946714'),
      chainId: 296,
    }
  },
 
  paths: {
    sources: "./contracts/hts-precompile",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
