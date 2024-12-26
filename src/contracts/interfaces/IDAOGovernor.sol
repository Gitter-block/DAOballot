// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IDAOGovernor {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Expired,
        Executed
    }

    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        address[] targets,
        uint256[] values,
        string[] signatures,
        bytes[] calldatas,
        uint256 startBlock,
        uint256 endBlock,
        string description
    );

    event ProposalExecuted(uint256 proposalId);
    event VoteCast(address voter, uint256 proposalId, uint8 support, uint256 weight);

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) external returns (uint256);

    function execute(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) external payable returns (uint256);

    function castVote(uint256 proposalId, uint8 support) external returns (uint256);
    function state(uint256 proposalId) external view returns (ProposalState);
}

