const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernanceToken", function () {
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
        token = await GovernanceToken.deploy();
        await token.deployed();
    });

    it("Should assign total supply to owner", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerBalance);
    });

    it("Should allow delegation", async function () {
        await token.delegate(addr1.address);
        expect(await token.delegates(owner.address)).to.equal(addr1.address);
    });

    it("Should track voting power", async function () {
        await token.delegate(owner.address);
        const blockNum = await ethers.provider.getBlockNumber();
        expect(await token.getVotes(owner.address)).to.equal(await token.balanceOf(owner.address));
    });
});

