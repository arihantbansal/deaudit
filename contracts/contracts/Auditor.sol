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

	address[] public eligibleJuryMembers;
	mapping(address => Audit) public audits;
	address payable public owner; // public payable address for fees

	// global variables for Chainlink VRF
	VRFCoordinatorV2Interface COORDINATOR;
	uint64 vrfSubscriptionId;
	address vrfCoordinator = 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;
	bytes32 keyHash =
		0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;
	uint32 callbackGasLimit = 100000;
	uint16 requestConfirmations = 3;
	uint32 numMembers = 5;
	mapping(uint256 => address) requestToAudit;

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
	event JuryMemberAdded(address indexed memberAddress, uint256 timestamp);

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

	function requestRandomWords(address contractAddress) internal {
		uint256 requestId = COORDINATOR.requestRandomWords(
			keyHash,
			vrfSubscriptionId,
			requestConfirmations,
			callbackGasLimit,
			numMembers
		);
		requestToAudit[requestId] = contractAddress;
	}

	function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
		internal
		override
	{
		address contractAddress = requestToAudit[requestId];

		for (uint8 i = 0; i < 5; i++) {
			audits[contractAddress].jury[i] = eligibleJuryMembers[
				randomWords[i] % eligibleJuryMembers.length
			];
		}
	}

	function createAudit(address contractAddress) external payable equallyFunded {
		requestRandomWords(contractAddress);

		Audit storage newAudit = audits[contractAddress];

		newAudit.creator = msg.sender;
		newAudit.contractAddress = contractAddress;
		newAudit.createdTime = block.timestamp;
		newAudit.totalYesPool = msg.value / 2;
		newAudit.totalNoPool = msg.value / 2;

		newAudit.yesPool[msg.sender] = newAudit.totalYesPool;
		newAudit.yesPoolFunders.push(msg.sender);
		newAudit.noPool[msg.sender] = newAudit.totalNoPool;
		newAudit.noPoolFunders.push(msg.sender);

		emit AuditRequested(msg.sender, contractAddress, block.timestamp);
	}

	function fundNoBugs(address contractAddress) external payable {
		//will have to add streaming payments
		audits[contractAddress].totalNoPool += msg.value;
		audits[contractAddress].noPool[msg.sender] = msg.value;
		audits[contractAddress].noPoolFunders.push(msg.sender);

		emit AuditNoPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalNoPool
		);
	}

	function reportBug(address contractAddress) external payable {
		Bug memory newBug = Bug({ createdTime: block.timestamp, verdict: 0 });

		audits[contractAddress].reporterToBugs[msg.sender].push(newBug);
		audits[contractAddress].bugReporters.push(msg.sender);

		emit NewBugReported(contractAddress, msg.sender, block.timestamp);

		audits[contractAddress].totalYesPool += msg.value;
		audits[contractAddress].yesPool[msg.sender] = msg.value;
		audits[contractAddress].yesPoolFunders.push(msg.sender); // check if user has not created bug already

		emit AuditYesPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalYesPool
		);
	}

	function juryVote(address contractAddress, bool vote) external {}

	function juryVerdict(
		address contractAddress,
		address reporter,
		bool verdict
	) public {
		// audits[contractAddress].reporterToBugs[reporter][bugIndex].verdict = verdict;

		uint256 noPool = audits[contractAddress].totalNoPool;
		uint256 yesPool = audits[contractAddress].totalYesPool;
		uint256 totalPayout = noPool + yesPool;

		uint256 juryReward = (totalPayout * 5) / 100;

		if (verdict) {
			audits[contractAddress].totalYesPool += noPool;
			audits[contractAddress].totalNoPool = 0;

			// Paying out jury
			for (uint256 i = 0; i < audits[contractAddress].jury.length; i++) {
				payable(audits[contractAddress].jury[i]).transfer(juryReward / 5);
			}

			audits[contractAddress].totalYesPool =
				(audits[contractAddress].totalYesPool * 19) /
				20;
			uint256 x = audits[contractAddress].totalYesPool;
			for (
				uint256 index = 0;
				index < audits[contractAddress].yesPoolFunders.length;
				index++
			) {
				address payable voter = payable(
					audits[contractAddress].yesPoolFunders[index]
				);
				voter.transfer((audits[contractAddress].yesPool[voter] * x) / yesPool);
				audits[contractAddress].totalYesPool -= ((audits[contractAddress]
					.yesPool[voter] * x) / yesPool);
			}
		} else {
			if (
				audits[contractAddress].totalNoPool >
				19 * (audits[contractAddress].totalYesPool)
			) {
				// totalNoPool has to be greater than 95% of sum of both pools for liquidation
				audits[contractAddress].totalNoPool += yesPool;
				audits[contractAddress].totalYesPool = 0;

				// Paying out jury
				for (uint256 i = 0; i < audits[contractAddress].jury.length; i++) {
					payable(audits[contractAddress].jury[i]).transfer(juryReward / 5);
				}

				audits[contractAddress].totalNoPool =
					(audits[contractAddress].totalNoPool * 19) /
					20;
				uint256 x = audits[contractAddress].totalNoPool;
				for (
					uint256 index = 0;
					index < audits[contractAddress].noPoolFunders.length;
					index++
				) {
					address payable voter = payable(
						audits[contractAddress].noPoolFunders[index]
					);
					voter.transfer((audits[contractAddress].noPool[voter] * x) / noPool);
					audits[contractAddress].totalNoPool -= ((audits[contractAddress]
						.yesPool[voter] * x) / noPool);
				}
			}
		}
	}

	function getAudit(address contractAddress)
		public
		view
		returns (
			address creator,
			address[5] memory jury,
			uint256 createdTime,
			uint256 totalYesPool,
			uint256 totalNoPool
		)
	{
		return (
			audits[contractAddress].creator,
			audits[contractAddress].jury,
			audits[contractAddress].createdTime,
			audits[contractAddress].totalYesPool,
			audits[contractAddress].totalNoPool
		);
	}

	function addEligibleJuryMember(address memberAddress) public onlyOwner {
		eligibleJuryMembers.push(memberAddress);

		emit JuryMemberAdded(memberAddress, block.timestamp);
	}

	function transferOwnership(address payable _owner) external onlyOwner {
		owner = _owner;
	}
}
