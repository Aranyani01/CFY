// const SimplestVote1202 = artifacts.require("./simple-version/SimplestVote1202.sol");
const ForwardContractNFT = artifacts.require("./ForwardContractNFT.sol");
// const TokenVote1202 = artifacts.require("./simple-version/TokenVote1202.sol");

const LeaseNFT = artifacts.require("./LeaseNFT.sol");
const LoanNFT = artifacts.require("./LoansNFT.sol");


module.exports = async function(deployer) {

  //deployer.deploy(SimplestVote1202);

  const devAccounts =       [
    0xd73A01C4b9D7175EFa05f414E757e75fc1e14b9F,
    0x168fbF3566166A088ca6D392F00087197DccBD02,
    0xA791c85dF0CC0866dddDF5dCfC2dda639dFA83Bf
  ];

  // await deployer.deploy(ForwardContractNFT);
  // await deployer.deploy(TokenVote1202);
  // tokenVote1202 = await TokenVote1202.deployed();
  // await tokenVote1202.init(SampleToken.address, [1, 2, 3], devAccounts);
  LeaseNFT.new.estimateGas()
  await deployer.deploy(LeaseNFT);
  await deployer.deploy(LoanNFT);

  // advancedTokenVote1202 = await AdvancedTokenVote1202.deployed();
  // await advancedTokenVote1202.createIssue(BasicErc20Token.address, [1, 2, 3], devAccounts, 'Issue 0: should we issue more tokens?');
};
