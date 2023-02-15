// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.25 <0.9.0;
import "hardhat/console.sol";

contract Retriever {

    struct token_amount {
        address token;
        uint256 balance;
    }

    token_amount[] private tokenBalances; //dynamic list

    
    function getBalances(address walletAddress, address[] memory tokenAddress) public {
        cleanBalances(); // Assume we want to reuse this function, we will need to clear the list everytime

        for (uint i = 0; i < tokenAddress.length; i++) {
            // assuming all token contracts have the same balanceOf signature
            // state changing
            (bool success, bytes memory data) = address(tokenAddress[i]).call(abi.encodeWithSignature("balanceOf(address)", walletAddress));
            
            if (success) {
                uint256 amount = abi.decode(data, (uint256));
                tokenBalances.push(token_amount(tokenAddress[i], amount));
            }
        }
    }

    function showBalances() public view returns(token_amount[] memory){
        return tokenBalances;
    }

    function cleanBalances() public {
        delete tokenBalances;
    }

}