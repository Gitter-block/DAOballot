// contracts/token/GovernanceToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    constructor() 
        ERC20("DAOGovernance", "DAOG")
        ERC20Permit("DAOGovernance")
    {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

