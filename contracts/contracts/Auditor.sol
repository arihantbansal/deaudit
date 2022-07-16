// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

contract Auditor {
	struct Audit {
		address creator;
		address contractAddress;
		address[] jury;
		uint256 timestamp;
		uint256 totalYesPool;
		uint256 totalNoPool;
		mapping(address => uint256) yesPool;
		mapping(address => uint256) noPool;
		mapping(address => Bug) bugs;
	}

	struct Bug {
		uint256 timestamp;
		bool verdict;
	}

	Audit[] audits;
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
			timestamp: block.timestamp,
			totalYesPool: msg.value / 2,
			totalNoPool: msg.value / 2,
			jury: []
		});
		newAudit.yesPool[msg.sender] = newAudit.totalYesPool;
		newAudit.noPool[msg.sender] = newAudit.totalNoPool;
		audits.push(newAudit);

		emit AuditRequested(msg.sender, contractAddress, block.timestamp);
	}

	function fundNoBugs(address contractAddress) external {
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
			timestamp: block.timestamp,
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
		if (verdict) {
			uint256 noPool = audits[contractAddress].totalNoPool;
			uint256 yesPool = audits[contractAddress].totalYesPool;

			uint256 bet = audits[contractAddress].yesPool[reporter];
			uint256 reporterReward = ((bet * 100) / yesPool) * (yesPool + noPool);

			for (address voter in audits[contractAddress].yesPool) {
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

	function transferOwnership(address payable _owner) external onlyOwner {
		owner = _owner;
	}
}
