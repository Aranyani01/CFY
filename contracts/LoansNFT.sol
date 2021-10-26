// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract LoansNFT is IERC721Receiver, Pausable, Ownable {

    event LoansUpdated();

    using SafeMath for uint;

    enum Status { PENDING, ACTIVE, CANCELLED, ENDED, DEFAULTED }

    address payable public constant CFY_VAULT = 0xFD7Ec510f6346a37bF6485EfAA7E66b499900f61;

    struct LoanRequest {
        uint loanID;
        address payable lender;
        address payable borrower;
        address smartContractAddressOfNFT;
        uint tokenIdNFT;
        uint loanAmount;
        uint interestAmount;
        uint singlePeriodTime;
        uint maximumInterestPeriods;
        uint endLoanTimeStamp;
        Status status;
    }

    address public manager;
    address public Cfytoken;
    uint public totalLoanRequests;
    uint public totalRewards;
    mapping(uint => LoanRequest) public allLoanRequests;

    modifier isValidLoanID(uint loanID) {
        require(
            loanID < totalLoanRequests,
            "Loan ID is invalid."
        );
        _;
    }

    modifier onlyManager() { // Modifier
        require(
            msg.sender == manager,
            "Only leasing manager can call this."
        );
        _;
    }

    constructor() public {
        manager = msg.sender;
        totalLoanRequests = 0;
        launchblock = block.timestamp
    }

    // CFY tokens issued as rewards for participating in lending protocol
    // issued both to lenders (upon lending) and borrowers (upon repayment).
    function mintReward(uint256 amount, address recipient) private internal {
      Cfy = new ERC20(Cfytoken);
      Cfy.mint(recipient, amount);
    }

    // Equivalent to 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'
    // Or this.onERC721Received.selector
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
        return 0x150b7a02;
    }

    function setCFYToken(address tokenaddress) public onlyOwner {
       Cfytoken = tokenaddress;
    }

    // Reward period 1 - 0-7 days
    // Reward period 2 - 7-21 days
    // Reward period 3 - 21+ days
    function calculateReward(uint256 amountTransacted) public returns (uint256){
      timeElapsed = (block.timestamp - launchblock)/1 days;
      if(timeElapsed <=7 && totalRewards <=100000){
        uint256 reward = amountTransacted * 2
      }
      elif(timeElapsed <=21 && totalRewards <=250000){
        uint256 reward = amountTransacted * 1
      }
      elif(timeElapsed >=21 && totalRewards <=500000){
        uint256 reward = amountTransacted / 5
      }
      else {
        uint256 reward = 0 * 1
      }
      totalRewards += reward;
      return reward;
    }



    function pauseLoans() public onlyManager {
        _pause();
    }

    function unPauseLoans() public onlyManager {
        _unpause();
    }

    function createLoanRequest(address smartContractAddressOfNFT,
                                uint tokenIdNFT,
                                uint loanAmount,
                                uint interestAmount,
                                uint singlePeriodTime,
                                uint maximumInterestPeriods) public whenNotPaused {
        require(singlePeriodTime <= 31 days, "A single period can have a maximum of one month.");
        require(interestAmount < 2*loanAmount, "Interest must be lower than 2 * principal of the loan.");
        require(maximumInterestPeriods <= 12, "Maximum interest periods are 12.");
        require(maximumInterestPeriods > 0, "Maximum interest period cannot be 0.");

        IERC721 currentNFT = IERC721(smartContractAddressOfNFT);
        require(currentNFT.getApproved(tokenIdNFT) == address(this), "Transfer has to be approved first");

        LoanRequest storage loanRequest =  allLoanRequests[totalLoanRequests];
        loanRequest.loanID = totalLoanRequests;
        loanRequest.lender = address(0x0);
        loanRequest.borrower = msg.sender;
        loanRequest.smartContractAddressOfNFT = smartContractAddressOfNFT;
        loanRequest.tokenIdNFT = tokenIdNFT;
        loanRequest.loanAmount = loanAmount;
        loanRequest.interestAmount = interestAmount;
        loanRequest.singlePeriodTime = singlePeriodTime;
        loanRequest.maximumInterestPeriods = maximumInterestPeriods;
        loanRequest.status = Status.PENDING;
        totalLoanRequests = SafeMath.add(totalLoanRequests, 1);

        currentNFT.safeTransferFrom(msg.sender, address(this), tokenIdNFT);
        emit LoansUpdated();
    }

    function acceptLoanRequest(uint loanID) payable public isValidLoanID(loanID) whenNotPaused {
        require(allLoanRequests[loanID].status == Status.PENDING, "Status is not PENDING for loan.");
        require(allLoanRequests[loanID].borrower != msg.sender, "Invalid operation. You cannot underwrite your own loan.");

        // The lender is require to underwrite the total loan amount minus the interest
        // For the first period of the loan
        uint sumForLoan = allLoanRequests[loanID].loanAmount - allLoanRequests[loanID].interestAmount;
        require(msg.value >= sumForLoan, "Not enough Ether sent to function to underwrite loan.");

        allLoanRequests[loanID].maximumInterestPeriods = allLoanRequests[loanID].maximumInterestPeriods - 1;

        allLoanRequests[loanID].lender = msg.sender;
        allLoanRequests[loanID].status = Status.ACTIVE;
        allLoanRequests[loanID].endLoanTimeStamp = SafeMath.add(now, allLoanRequests[loanID].singlePeriodTime);

        // Send sumForLoan to borrower, minus 2.5% to CFY token holders
        // NFT is kept by the loans smart contract

        uint cfySHARE = sumForLoan.mul(25).div(1000);
        CFY_VAULT.transfer(cfySHARE);
        allLoanRequests[loanID].borrower.transfer(sumForLoan - cfySHARE);
        emit LoansUpdated();

        // issue reward
        uint256 reward = calculateReward(allLoanRequests[loanID].loanAmount);
        mintReward(reward, allLoanRequests[loanID].lender);
    }

    function extendLoanRequest(uint loanID) payable public isValidLoanID(loanID) whenNotPaused {
        require(allLoanRequests[loanID].status == Status.ACTIVE, "Status is not ACTIVE for loan");
        require(allLoanRequests[loanID].borrower == msg.sender, "Only the borrower can call this function.");
        require(allLoanRequests[loanID].maximumInterestPeriods > 0, "The maximum number of extensions to the loan has been reached.");
        require(msg.value >= allLoanRequests[loanID].interestAmount, "Not enough Ether sent to the function to extend loan.");


        allLoanRequests[loanID].maximumInterestPeriods = allLoanRequests[loanID].maximumInterestPeriods - 1;
        allLoanRequests[loanID].endLoanTimeStamp = SafeMath.add(allLoanRequests[loanID].endLoanTimeStamp, allLoanRequests[loanID].singlePeriodTime);

        allLoanRequests[loanID].lender.transfer(allLoanRequests[loanID].interestAmount);
        emit LoansUpdated();
    }

    function endLoanRequest(uint loanID) payable public isValidLoanID(loanID) {
        require(allLoanRequests[loanID].status == Status.ACTIVE, "Status is not ACTIVE to end loan.");
        require((msg.sender == allLoanRequests[loanID].lender  &&
                now >= allLoanRequests[loanID].endLoanTimeStamp) || msg.sender == allLoanRequests[loanID].borrower,
                "Unable to end loan.");

        // Borrower sends principal amount of loan back to lender
        // And receives NFT collateral back
        if (msg.sender == allLoanRequests[loanID].borrower) {
            require(msg.value >= allLoanRequests[loanID].loanAmount, "The principal amount of the loan was not sent.");
            allLoanRequests[loanID].status = Status.ENDED;
            allLoanRequests[loanID].lender.transfer(allLoanRequests[loanID].loanAmount);
            //calculate and mint rewards
            uint256 reward = calculateReward(allLoanRequests[loanID].loanAmount);
            mintReward(reward, allLoanRequests[loanID].borrower);
        } else {
            allLoanRequests[loanID].status = Status.DEFAULTED;
        }

        // NFT is sent to the function caller (the lender or borrower).
        IERC721 currentNFT = IERC721(allLoanRequests[loanID].smartContractAddressOfNFT);
        currentNFT.approve(msg.sender, allLoanRequests[loanID].tokenIdNFT);
        currentNFT.transferFrom(address(this), msg.sender, allLoanRequests[loanID].tokenIdNFT);
        emit LoansUpdated();
    }

    function cancelLoanRequest(uint loanID) public isValidLoanID(loanID) {
        require(allLoanRequests[loanID].status == Status.PENDING, "Status is not PENDING to cancel loan request");
        require(msg.sender == allLoanRequests[loanID].borrower);

        allLoanRequests[loanID].status = Status.CANCELLED;

        IERC721 currentNFT = IERC721(allLoanRequests[loanID].smartContractAddressOfNFT);
        currentNFT.approve(msg.sender, allLoanRequests[loanID].tokenIdNFT);
        currentNFT.transferFrom(address(this), msg.sender, allLoanRequests[loanID].tokenIdNFT);
        emit LoansUpdated();
    }
}
