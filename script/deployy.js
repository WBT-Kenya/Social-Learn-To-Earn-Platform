// //Deploy the contract instance
// const contractTx = await new ContractCreateTransaction()
//     //The bytecode file ID
//     .setBytecodeFileId(bytecodeFileId)
//     //The max gas to reserve
//     .setGas(2000000);

// //Submit the transaction to the Hedera test network
// const contractResponse = await contractTx.execute(client);

// //Get the receipt of the file create transaction
// const contractReceipt = await contractResponse.getReceipt(client);

// //Get the smart contract ID
// const newContractId = contractReceipt.contractId;

// //Log the smart contract ID
// console.log("The smart contract ID is " + newContractId);

console.clear();

const { Client, AccountId, ContractFunctionParameters } = require('@hashgraph/sdk');

const sdkPath = './../../hedera.sdk/';
const SolidityTypes = require(sdkPath + 'constants/solidity');

const clientHandler = require('../../hedera.sdk/handlers/clientHandler');
const accountHandler = require('../../hedera.sdk/handlers/accountHandler');
const contractHandler = require('../../hedera.sdk/handlers/contractHandler');
const signatureHandler = require('../../hedera.sdk/handlers/signHandler');

async function storeAndDeployLTEContract(client, treasuryKey, contractPath, tokenInfo) {
  // Remaining code...

  const maxTransactionFee = 50;
    const contractObject = await contractHandler.addBigContractFile(contractPath, maxTransactionFee, treasuryKey, client);
    const contractFunctionParameters = new ContractFunctionParameters()
        .addString(tokenInfo.creatorName)
        .addString(tokenInfo.tokenSymbol)
        .addString(tokenInfo.tokenName)
        .addUint64(tokenInfo.initialSupply);

    const contractTx = await contractHandler.deployContract(contractObject.bytecodeFileId, contractFunctionParameters, client);
    const contractRx = await signatureHandler.signTransaction(contractTx, client, treasuryKey);

    console.log(`\nContract deployment successfull\n`);
    console.log(`Contract ID : ${contractRx.contractId}`);
    console.log(`Contract Solidity ID : ${contractRx.contractId.toSolidityAddress()}`);
    console.log(`Check it out @ https://explorer.arkhia.io/#/testnet/contract/${contractRx.contractId}\n`);
    return contractRx.contractId;
}


async function createFungibleToken(client, contractId) {
  // Remaining code...
  // Create FT using TokenSender create function
  const createToken = new ContractExecuteTransaction()
  .setContractId(contractId)
  .setGas(500000)
  .setPayableAmount(50)
  .setFunction("createFungibleToken");

const createTokenTx = await createToken.execute(client);
const createTokenRx = await createTokenTx.getRecord(client);
const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
const tokenId = TokenId.fromSolidityAddress(tokenIdSolidityAddr);
  
console.log(`\nToken created with ID: ${tokenId} from contract Id ${contractId}\n`);

return tokenId;
}
async function queryContract(client, contractId) {
    await accountHandler.getAccountBalance(client);
    await contractHandler.getContractCallQuery(client, contractId, "getContractBalance", SolidityTypes.Number256);
    await contractHandler.getContractCallQuery(client, contractId, "getTokenRemainingBalance", SolidityTypes.Number256);
    // await contractHandler.getContractCallQuery(client, contractId, "getLTELearnerNumbers", SolidityTypes.Number256);
    await accountHandler.getAccountBalance(client);
}
async function CreateLTEInitialData(getLTEContractPath, tokenInfo, client, treasuryKey) {

    // Deploys LTE contract (must be compiled first)
    const contractId = await storeAndDeployLTEContract(client, treasuryKey, getLTEContractPath, tokenInfo);

    // Mint Token supply through contract
    console.log(`Contract is minting the token...`);
    const tokenId = await createFungibleToken(client, contractId);

    // Verify Data after
    await queryContract(client, contractId);

    return { 
        contractId: contractId.toString(), 
        fungibleTokenId: tokenId.toString(), 
    };
}


async function main() {

  // Init clients/users
  const client = await clientHandler.getTestnetClient();
  const treasuryKey = await clientHandler.getTestnetPrivateKey();
 
  // Create a new Hedera client
  //const client = Client.forTestnet(); // Or Client.forMainnet() for the Hedera mainnet



  const operatorAccountId = AccountId.fromString ('0.0.14600973'); //('YOUR_OPERATOR_ACCOUNT_ID');
  const operatorPrivateKey = '302e020100300506032b657004220420792547fac8a4f704839a25ff281bace0b54190fb588bb40acc12895de7ef9721';//'<YOUR_OPERATOR_PRIVATE_KEY>';

   //const client = Client.forTestnet();
   client.forTestnet("testnet.hedera.com:50005");
  
  // Set the operator account in the Hedera client
  client.setOperator(operatorAccountId, operatorPrivateKey);

  // Set the network URL for the Hedera client
 // client.setNetwork('https://hedera.testnet.mirrornode.hedera.com:50211'); // Or the mainnet network URL for mainnet

 

  // Set variables
  const tokenInfo = { creatorName: 'AWoW3', tokenSymbol: '$$$', tokenName: 'ABC', initialSupply: 100000 };

  // 1. Deploy Contract
  const getLTEContractPath = './../../../contracts/hts-precompile/build/TokenCreateContract_sol_TokenCreateContract.abi';
  const result = await storeAndDeployLTEContract(client, treasuryKey, getLTEContractPath, tokenInfo);
  console.log('Output is successful');
  console.log(result);
  console.log('\nPlease verify all the elements were created successfully.\n');
  console.log(`Contract:          https://explorer.arkhia.io/#/testnet/contract/${result.contractId}`);
  console.log(`Contract Token:    https://explorer.arkhia.io/#/testnet/token/${result.fungibleTokenId}`);
}

main();