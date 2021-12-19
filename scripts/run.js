const hre = require("hardhat");

async function main() {
  const SimonToken = await hre.ethers.getContractFactory("Simontoken");
  const SimonTokenContract = await SimonToken.deploy(100000000);

  await SimonTokenContract.deployed();

  console.log("SimonTokenContract deployed to:", SimonTokenContract.address);

  const [owner] = await hre.ethers.getSigners();
  const SimonTokenSale = await hre.ethers.getContractFactory("SimonTokenSale");
  // console.log(owner.address);
  const SimonTokenSaleContract = await SimonTokenSale.deploy(1, owner.address, SimonTokenContract.address);
  console.log("Simon token sale is deployed to: ", SimonTokenSaleContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
