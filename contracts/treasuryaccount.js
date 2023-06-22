const ethers = require('ethers');
const { Client,TokenCreateTransaction,PrivateKey,AccountId, ContractCreateFlow,Hbar } = require("@hashgraph/sdk");
const fs = require("fs");
require('dotenv').config({
  path: './.env',
  encoding: 'UTF-8'
});

const operatorId= AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey=PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
//const treasuryKey = TreasuryKey.fromString(process.env.TREASURY_KEY);
    
async function createSmartContract() {
  const bytecode =  fs.readFileSync("./contracts/hts-precompile/build/LTE_sol_LTE.bin");

    let contractCreate = new ContractCreateFlow()
      .setGas(10000000)
      .setBytecode(bytecode); //(contract.bytecode);

    //Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = contractCreate.execute(client);

    // Get the receipt of the file create transaction
  
    const receipt = (await txResponse).getReceipt(client);

    // Get the new contract ID from the receipt

    const newContractId = (await receipt).contractId;

    // Log the file ID
    console.log("The smart contract ID is " + newContractId);
       
}
// Call the async function
createSmartContract();


