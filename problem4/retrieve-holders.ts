import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(`https://bsc-dataseed1.binance.org/`);
const addressSWTH = '0xC0ECB8499D8dA2771aBCbF4091DB7f65158f1468';
const addressOfHolders = ['0xb5d4f343412dc8efb6ff599d790074d0f1e8d430', '0x0020c5222a24e4a96b720c06b803fb8d34adc0af', '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'];
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const contract = new ethers.Contract(addressSWTH, abiERC20, provider);

const main = async () => {
    for (let i = 0; i < 3; i++) {
        let currBalance = await contract.balanceOf(addressOfHolders[i]);
        console.log(addressOfHolders[i] + ' ' + ethers.utils.formatUnits(currBalance, 8));
    }
};
main();
