const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy GovernanceToken
    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const token = await GovernanceToken.deploy();
    await token.deployed();
    console.log("GovernanceToken deployed to:", token.address);

    // Deploy TimelockController
    const TimelockController = await ethers.getContractFactory("DAOTimelock");
    const timelock = await TimelockController.deploy(
        172800, // 2 days
        [],
        [],
        deployer.address
    );
    await timelock.deployed();
    console.log("TimelockController deployed to:", timelock.address);

    // Deploy Governor
    const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
    const governor = await DAOGovernor.deploy(
        token.address,
        timelock.address,
        7200,    // voting delay
        50400,   // voting period
        4        // quorum percentage
    );
    await governor.deployed();
    console.log("DAOGovernor deployed to:", governor.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
