// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

contract Auditor {
	struct Audit {
		address creator;
		address contractAddress;
		uint256 timestamp;
		address[] jury;
		mapping(address => uint256) yesPool;
		mapping(address => uint256) noPool;
		mapping(address => bool) verdict;
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

	modifier onlyOwner() {
		require(msg.sender == owner, "Only accessible by owner!");
		_;
	}

	constructor() {
		owner = payable(msg.sender);
	}

	function transferOwnership(address payable _owner) external onlyOwner {
		owner = _owner;
	}
}
