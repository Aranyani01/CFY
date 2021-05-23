
pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CFYToken is ERC20 {
  string  public name = "CFY.Finance";
  string  public symbol = "CFY";
  string  public standard = "CFY.Finance Token";

  constructor() public {
        _mint(msg.sender, 500000);
    }
}
