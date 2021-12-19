const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN)); 
// work with big numbers

let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe("Token tests --", function () {
  let SimonToken, STcontract, owner, addr1, addr2, totalSupply;
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    SimonToken = await ethers.getContractFactory("Simontoken");
    STcontract = await SimonToken.deploy(100000000);
    await STcontract.deployed();
    totalSupply = await STcontract.totalSupply();
  })

  describe('Balances & supply', () => {
    it("All tokens should be in my account", async  () => {
      const ownerBalance = await STcontract.balanceOf(owner.address);
      expect(await STcontract.totalSupply()).to.equal(ownerBalance);
    });
    
    it("Check number type in my balance", async  () => {
      const ownerBalance = await STcontract.balanceOf(owner.address);
      expect(ownerBalance).to.equal(totalSupply);
    });
  
    it("Check balance with chai as promised", async  () => {
      // with eventually we handle the async state
      expect(STcontract.balanceOf(owner.address)).to.eventually.equal(totalSupply);
    });  
  })



  describe("Transactions", () => {
    it("Should be possible to transfer tokens between account", async () => {
      await STcontract.transfer(addr1.address, 100);
      let addr1Balance = await STcontract.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);
  
  
      await STcontract.connect(addr1).transfer(addr2.address, 50);
      let addr2Balance = await STcontract.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if send doesn't have enough tokens", async () => {
      const initialBalanceOwner = await STcontract.balanceOf(owner.address);
      await expect(STcontract.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
      expect(await STcontract.balanceOf(owner.address)).to.equal(initialBalanceOwner);
    });

    it("Should update balances after transfers", async () => {
      const initialBalanceOwner = await STcontract.balanceOf(owner.address);
      await STcontract.transfer(addr1.address, 100);
      await STcontract.transfer(addr2.address, 50);

      const finalOwnerBalance = await STcontract.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialBalanceOwner-150);

      const addr1Balance = await STcontract.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await STcontract.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);

    })
  })

});

