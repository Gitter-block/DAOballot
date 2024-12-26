const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAOGovernor", function () {
    let governor;
    let token;
    let timelock;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
        token = await GovernanceToken.deploy();
        await token.deployed();

        const TimelockController = await ethers.getContractFactory("DAOTimelock");
        timelock = await TimelockController.deploy(
            172800, // 2 days
            [],
            [],
            owner.address
        );
        await timelock.deployed();

        const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
        governor = await DAOGovernor.deploy(
            token.address,
            timelock.address,
            7200,    // voting delay
            50400,   // voting period
            4        // quorum percentage
        );
        await governor.deployed();
    });

    it("Should set correct initial values", async function () {
        expect(await governor.votingDelay()).to.equal(7200);
        expect(await governor.votingPeriod()).to.equal(50400);
        expect(await governor.quorumNumerator()).to.equal(4);
    });

    it("Should create a proposal", async function () {
        const proposalDescription = "Proposal #1: Store 1 in the box";
        const encodedFunction = ethers.utils.id("store(uint256)").slice(0, 10);
        
        await expect(
            governor.propose(
                [token.address],
                [0],
                [encodedFunction],
                proposalDescription
            )
        ).to.emit(governor, "ProposalCreated");
    });
});

