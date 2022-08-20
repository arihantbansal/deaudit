// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


/// @title A contract for decentralized audit marketplace
contract Auditor is VRFConsumerBaseV2 {
	struct Audit {
		address creator;
		address contractAddress;
		address[5] jury;
		address[] yesPoolFunders;
		address[] noPoolFunders;
		address[] bugReporters;
		uint256 createdTime;
		uint256 totalYesPool;
		uint256 totalNoPool;
		mapping(address => uint256) yesPool;
		mapping(address => uint256) noPool;
		mapping(address => Bug[]) reporterToBugs;
	}

	struct Bug {
		uint256 createdTime;
		uint256 verdict;
	}
	
	address[] eligibleJuryMembers;
	mapping(address => Audit) audits;
	address payable public owner; // public payable address for fees


	// global variables for Chainlink VRF
	VRFCoordinatorV2Interface COORDINATOR;
	uint64 vrfSubscriptionId;
	address vrfCoordinator = 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;
	bytes32 keyHash = 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;
  uint32 callbackGasLimit = 100000;
  uint16 requestConfirmations = 3;
  uint32 numMembers = 5;

	// custom events
	event AuditRequested(
		address indexed creator,
		address indexed contractAddress,
		uint256 timestamp
	);
	event AuditCompleted(
		address indexed creator,
		address indexed contractAddress,
		uint256 timestamp,
		bool verdict
	);
	event AuditCancelled(
		address indexed creator,
		address indexed contractAddress,
		uint256 timestamp
	);
	event AuditJuryUpdated(
		address indexed contractAddress,
		uint256 timestamp,
		address[] jury
	);
	event AuditYesPoolUpdated(
		address indexed contractAddress,
		address indexed voter,
		uint256 totalYesPool
	);
	event AuditNoPoolUpdated(
		address indexed contractAddress,
		address indexed voter,
		uint256 totalNoPool
	);
	event NewBugReported(
		address indexed contractAddress,
		address indexed reporter,
		uint256 timestamp
	);
	event JuryMemberAdded(
		address indexed memberAddress,
		uint256 timestamp
	);

	// custom modifiers
	modifier onlyOwner() {
		require(msg.sender == owner, "Only accessible by owner!");
		_;
	}

	modifier equallyFunded() {
		require(msg.value > 0 && msg.value % 2 == 0, "Must be equally funded!");
		_;
	}

	constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
		owner = payable(msg.sender);
		COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
		vrfSubscriptionId = subscriptionId;
	}

	function requestRandomWords() external {
		requestId = COORDINATOR.requestRandomWords(
      keyHash,
      vrfSubscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numMembers
    );
	}

	function fulfillRandomWords(uint256 /* requestId */, uint256[] memory randomMembers) internal override {
		
	}

	function createAudit(address contractAddress) external equallyFunded {
		Audit newAudit = Audit({
			creator: msg.sender,
			contractAddress: contractAddress,
			createdTime: block.timestamp,
			totalYesPool: msg.value / 2,
			totalNoPool: msg.value / 2,
			jury: []
		});
		
		newAudit.yesPool[msg.sender] = newAudit.totalYesPool;
		newAudit.yesPoolFunders.push(msg.sender);
		newAudit.noPool[msg.sender] = newAudit.totalNoPool;
		newAudit.noPoolFunders.push(msg.sender);

		audits[contractAddress] = newAudit;

		emit AuditRequested(msg.sender, contractAddress, block.timestamp);
	}

	function fundNoBugs(address contractAddress) external {
		audits[contractAddress].totalNoPool += msg.value;
		audits[contractAddress].noPool[msg.sender] = msg.value;
		audits[contractAddress].noPoolFunders.push(msg.sender);

		emit AuditNoPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalNoPool
		);
	}

	function reportBug(address contractAddress) external {
		Bug newBug = Bug({
			createdTime: block.timestamp,
		});

		audits[contractAddress].reporterToBugs[msg.sender].push(newBug);
		audits[contractAddress].bugReporters.push(msg.sender);

		emit NewBugReported(
			contractAddress,
			msg.sender,
			block.timestamp,
		);

		audits[contractAddress].totalYesPool += msg.value;
		audits[contractAddress].yesPool[msg.sender] = msg.value;
		audits[contractAddress].yesPoolFunders.push(msg.sender); // check if user has not created bug already

		emit AuditYesPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalYesPool
		);
	}

	function juryVerdict(address contractAddress, address reporter, bool verdict) {
		audits[contractAddress].bugs[reporter].verdict = verdict;
		if (verdict) {
			uint256 noPool = audits[contractAddress].totalNoPool;
			uint256 yesPool = audits[contractAddress].totalYesPool;

			uint256 bet = audits[contractAddress].yesPool[reporter];
			uint256 reporterReward = ((bet * 100) / yesPool) * (yesPool + noPool);

			for (address voter in audits[contractAddress].yesPoolFunders) {
				if (voter != reporter) {
					// uint256 voterReward = 
					// review voter reward logic
				}
			}

			yesPool += noPool;
			audits[contractAddress].totalNoPool = 0;
			uint256 juryReward = (yesPool * 5) / 100;

			address[] jury = audits[contractAddress].jury;
			for (uint256 i = 0; i < jury.length; i++) {
				jury.transfer(juryReward / 5); // review for reentrancy
			}
			yesPool -= (yesPool * 5) / 100; // review for gas

		}
	}

	function getAudit(address contractAddress) public view returns (address creator,
		address contractAddress,
		address[] memory jury,
		uint256 createdTime,
		uint256 totalYesPool,
		uint256 totalNoPool) {
			Audit auditFromAddress = audits[contractAddress];
			return (auditFromAddress.contractAddress, auditFromAddress.jury, auditFromAddress.createdTime, auditFromAddress.totalYesPool, auditFromAddress.totalNoPool);
	}

	function addEligibleJuryMember(address memberAddress) public onlyOwner {
		eligibleJuryMembers.push(memberAddress);

		emit JuryMemberAdded(memberAddress, block.timestamp);
	}

	function transferOwnership(address payable _owner) external onlyOwner {
		owner = _owner;
	}
}
