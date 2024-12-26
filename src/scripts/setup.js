const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    // Get deployed contract instances
    const governor = await ethers.getContract("DAOGovernor");
    const timelock = await ethers.getContract("DAOTimelock");
    const token = await ethers.getContract("GovernanceToken");

    // Setup roles
    const proposerRole = await timelock.PROPOSER_ROLE();
    const executorRole = await timelock.EXECUTOR_ROLE();
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

    // Grant roles
    await timelock.grantRole(proposerRole, governor.address);
    await timelock.grantRole(executorRole, ethers.constants.AddressZero);
    await timelock.revokeRole(adminRole, deployer.address);

    // Delegate voting power
    await token.delegate(deployer.address);

    console.log("DAO setup completed");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
