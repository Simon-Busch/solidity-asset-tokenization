//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Simontoken is ERC20 {
    constructor (uint _initialSupply) ERC20("Simon Token",  "ST") {
        // the whole initial suplly belongs to creator of smart contract
        _mint(msg.sender, _initialSupply);
    }
}
