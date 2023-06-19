const hre = require("hardhat");

async function main() {
  // Deploying contracts
  const LTE_tokentransfer = await hre.ethers.getContractFactory("LTE_tokentransfer");
  const lteTokenTransfer = await LTE_tokentransfer.deploy();

  await lteTokenTransfer.deployed();

  console.log("LTE_tokentransfer deployed to:", lteTokenTransfer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
