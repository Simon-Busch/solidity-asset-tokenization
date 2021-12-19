const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN)); 
// work with big numbers

let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe("Token tests --", function () {
  let SimonToken, STcontract, owner;
  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    SimonToken = await ethers.getContractFactory("Simontoken");
    STcontract = await SimonToken.deploy(100000000);
    await STcontract.deployed();
  })

  it("All tokens should be in my account", async function () {
    const ownerBalance = await STcontract.balanceOf(owner.address);
    expect(await STcontract.totalSupply()).to.equal(ownerBalance);
  });
  
  it("Check number type in my balance", async function () {
    const ownerBalance = await STcontract.balanceOf(owner.address);
    let totalSupply = await STcontract.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Check balance with chai as promised", async function () {
    let totalSupply = await STcontract.totalSupply();
    // with eventually we handle the async state
    expect(STcontract.balanceOf(owner.address)).to.eventually.equal(totalSupply);
  });
  
});
