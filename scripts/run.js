const hre = require("hardhat");

async function main() {
  const SimonToken = await hre.ethers.getContractFactory("Simontoken");
  const SimonTokenContract = await SimonToken.deploy(100000000);

  await SimonTokenContract.deployed();

  console.log("SimonTokenContract deployed to:", SimonTokenContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
