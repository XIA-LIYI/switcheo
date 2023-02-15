const { ethers } = require("ethers");

const ADDR = "0x49CD1Ed7c924dC12077586af06014dE22747d7Dd";
const ABI = [
	{
		"inputs": [],
		"name": "cleanBalances",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "tokenAddress",
				"type": "address[]"
			}
		],
		"name": "getBalances",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showBalances",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"internalType": "struct Retriever.token_amount[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const ADDRESS = "0xDB27e5Ce3c869580072963FF521d5462E8e2121b"; 
const TOKENS = [
	"0x4963056F3D4C23cd6c58F97c4a6c09D4FaCC706F"
];

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const signer = provider.getSigner(); 

const test = async () => {

	const contract = new ethers.Contract(ADDR, ABI, signer);

    try {
		await contract.getBalances(ADDRESS, TOKENS);
    } catch(error) {
		console.log("error: " + error);
    }
	
	const balances = contract.showBalances();

	return balances;
};

test().then(
    data => {
        console.log(data);
    }
);