pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CFYToken is ERC20("CFYFinance", "CFY") {
  constructor() public {
        _mint(msg.sender, 500000);
    }
}
