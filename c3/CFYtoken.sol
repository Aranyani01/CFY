pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CFYToken is ERC20("CFYFinance", "CFY") {
  // TotalSupply will be capped at 1 million CFY tokens. 25% will be issued to origin,
  // 25% will be stored in a vault with 6 month lockup for future liquidity rewards
  // 50% will be given out as initial liquidity rewards in the first 90 days

  public address vault =
  constructor() public {
        _mint(msg.sender, 250000); // origin
        _mint(vault, 250000); // vault
    }
}
