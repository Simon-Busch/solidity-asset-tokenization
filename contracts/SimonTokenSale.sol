//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Crowdsale.sol";

contract SimonTokenSale is Crowdsale {
  constructor(uint rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {

  }
}
