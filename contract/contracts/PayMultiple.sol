//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PayMultiple {
    address public token;
    address public owner;
    uint256 nextPaymentId = 1;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }

    constructor(address _tokenAddress, address _owner) {
        token = _tokenAddress;
        owner = _owner;
    }

    event PaymentSuccessful(uint256 paymentId);

    // Pay multiple users at once
    function pay(address[] memory users, uint256[] memory amounts) external {
        require(users.length == amounts.length, "Arrays length mismatch");

        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            uint256 amount = amounts[i];

            require(user != address(0), "Invalid address");
            require(amount > 0, "Amount must be greater than 0");

            IERC20(token).transfer(user, amount);
        }

        emit PaymentSuccessful(nextPaymentId);
        nextPaymentId++;
    }

    // Function to recover any mistakenly sent ERC-20 tokens to the contract
    function recoverTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        IERC20(tokenAddress).transfer(owner, amount);
    }

    // Withdraw any remaining tokens in the contract to the owner
    function withdrawRemainingTokens() external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner, balance);
    }

    function transferOwnership(address _owner) external onlyOwner {
        owner = _owner;
    }
}
