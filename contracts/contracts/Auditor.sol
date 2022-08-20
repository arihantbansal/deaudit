// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

contract Auditor {
	struct Audit {
		address creator;
		address contractAddress;
		address[5] jury;
		address[] yesPoolFunders;
		address[] noPoolFunders;
		uint256 createdTime;
		uint256 totalYesPool;
		uint256 totalNoPool;
		mapping(address => uint256) yesPool;
		mapping(address => uint256) noPool;
		mapping(address => Bug) bugs;
	}

	struct Bug {
		uint256 createdTime;
		mapping(address => uint256) vote;
		bool verdict;
	}
	
	address[] eligibleJuryMembers;
	mapping(address => Audit) audits;
	address payable public owner; // public payable address for fees

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

	modifier onlyOwner() {
		require(msg.sender == owner, "Only accessible by owner!");
		_;
	}

	modifier equallyFunded() {
		require(msg.value > 0 && msg.value % 2 == 0, "Must be equally funded!");
		_;
	}

	constructor() {
		owner = payable(msg.sender);
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

	function fundNoBugs(address contractAddress) external { //will have to add streaming payments
		audits[contractAddress].totalNoPool += msg.value;
		audits[contractAddress].noPool[msg.sender] = msg.value;

		emit AuditNoPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalNoPool
		);
	}

	function reportBug(address contractAddress) external {
		Bug newBug = Bug({
			createdTime: block.timestamp,
			verdict: false
		});

		audits[contractAddress].bugs[msg.sender] = newBug;

		emit NewBugReported(
			contractAddress,
			msg.sender,
			block.timestamp,
		);

		audits[contractAddress].totalYesPool += msg.value;
		audits[contractAddress].yesPool[msg.sender] = msg.value;

		emit AuditYesPoolUpdated(
			contractAddress,
			msg.sender,
			audits[contractAddress].totalYesPool
		);
	}

	function juryVerdict(address contractAddress, address reporter, bool verdict) {
		audits[contractAddress].bugs[reporter].verdict = verdict;
		uint256 noPool = audits[contractAddress].totalNoPool;
		uint256 yesPool = audits[contractAddress].totalYesPool;
		uint totalPayout = noPool + yesPool;
		if (verdict) {
			uint totalPayout = noPool + yesPool;
			audits[contractAddress].totalYesPool+=noPool;
			audits[contractAddress].totalNoPool=0;
			//transferring to jury
			uint256 juryReward = (totalPayout * 5) / 100;
			address[] jury = audits[contractAddress].jury;
			for (uint256 i = 0; i < jury.length; i++) {
				jury.transfer(juryReward / 5); 
			}
			audits[contractAddress].totalYesPool=audits[contractAddress].totalYesPool*0.95;
			uint256 x = audits[contractAddress].totalYesPool;
			for (address voter in audits[contractAddress].yesPoolFunders) {
				voter.transfer(audits[contractAddress].yesPool[voter]*x/yesPool);
				audits[contractAddress].totalYesPool-=(audits[contractAddress].yesPool[voter]*x/yesPool);
			}
    
		}
		else{
             if(audits[contractAddress].totalNoPool>19*(audits[contractAddress].totalYesPool){ //totalNoPool has to be greater than 95% of sum of both pools for liquidation
				audits[contractAddress].totalNoPool+=yesPool;
				audits[contractAddress].totalYesPool=0;
				//transferring to jury
				uint256 juryReward = (totalPayout * 5) / 100;
				address[] jury = audits[contractAddress].jury;
				for (uint256 i = 0; i < jury.length; i++) {
					jury.transfer(juryReward / 5); 
				}
				audits[contractAddress].totalNoPool=audits[contractAddress].totalNoPool*0.95;
				uint256 x = audits[contractAddress].totalNoPool;
				for (address voter in audits[contractAddress].noPoolFunders) {
					voter.transfer(audits[contractAddress].noPool[voter]*x/noPool);
					audits[contractAddress].totalNoPool-=(audits[contractAddress].yesPool[voter]*x/noPool);
				}


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
