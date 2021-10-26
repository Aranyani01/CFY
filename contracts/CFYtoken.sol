
pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// TotalSupply will be capped at 1 million CFY tokens. 25% will be issued to origin,
// 25% will be stored in a vault with 6 month lockup for future liquidity rewards
// 50% will be given out as initial liquidity rewards in the first 90 days

contract CFYToken is ERC20 {
  string  public name = "CFY.Finance";
  string  public symbol = "CFY";
  string  public standard = "CFY.Finance Token";
  string address vault = 0xFD7Ec510f6346a37bF6485EfAA7E66b499900f61 ;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  constructor(address loansNFT) public ERC20(name, symbol) {
      _mint(msg.sender, 250000); // origin
      _mint(vault, 250000); // vault
      _setupRole(MINTER_ROLE, minter);
    }

  // Only LoansNFT can mint CFY as reward Mining for trades.
  function mint(address to, uint256 amount) public {
         // Check that the calling account has the minter role
         require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
         _mint(to, amount);
     }
}
