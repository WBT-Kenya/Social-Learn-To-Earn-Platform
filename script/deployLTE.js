console.clear();
const hre = require("hardhat");
require("dotenv").config();
const { Client, AccountId, TokenSupplyType, ContractFunctionParameters, AccountCreateTransaction, PrivateKey, Hbar } = require('@hashgraph/sdk');

const clientHandler = require('../contracts/hedera.sdk/handlers/clientHandler');
const signHandler = require("../contracts/hedera.sdk/handlers/signHandler");
const tokenHandler = require('../contracts/hedera.sdk/handlers/tokenHandler');


async function createFungibleToken(name, symbol, supplyType, initialTokenSupply) {
  // Create initial token
  //const contract = await ethers.getContractFactory(LTE);
  let contractCreate = new ContractCreateFlow()
  const createToken = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(500000)
    .setPayableAmount(50)
    .setFunction("createFungibleToken");
   
  const txResponse = await contractCreate.execute(client);
 
  const createTokenTx = await createToken.execute(client);
  const createTokenRx = await createTokenTx.getRecord(client);
  const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
  const tokenId = TokenId.fromSolidityAddress(tokenIdSolidityAddr);
    
  console.log(`\nToken successfully created with ID: ${tokenId} from contract Id ${contractId}\n`);
  
  return tokenId;
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

const { ethers } = require("ethers");
async function main() {
  //const provider = new ethers.providers.JsonRpcProvider("");

  // Hedera Deployer Account
  const operatorId = AccountId.fromString(
    `${process.env.OPERATOR_ID_ECDSA}`
  );
  const operatorKey = PrivateKey.fromString(
  //`${process.env.HBAR_DEPLOYER_PRIVATE_KEY}`
  `${process.env.OPERATOR_PVKEY_ECDSA}`
  );

if (operatorId === null || operatorKey === null) {
  throw new Error(
    "Environment variables OPERATOR_ID_ECDSA and OPERATOR_PVKEY_ECDSA must be present"
  );
}
const client = Client.forTestnet().setOperator(operatorId, operatorKey);


	// Set the operator account in the Hedera client
	client.forTestnet("testnet.hedera.com:50005");
	client.setOperator(operatorAccountId, operatorPrivateKey);
	
	// Set variables
	const tokenInfo = { creatorName: 'AWoW3', tokenSymbol: '$$$', tokenName: 'ABC', initialSupply: 100000 };
  
	// 1. Deploy Contract
	const getLTEContractPath = './../../../contracts/hts-pre-compile/build/LTE_sol_LTE.bin';
	const result = await storeAndDeployLTEContract(client, treasuryKey, getLTEContractPath, tokenInfo);
	console.log('Output is successful');
	console.log(result);
	console.log('\nPlease verify all the elements were created successfully.\n');
	console.log(`Contract:          https://explorer.arkhia.io/#/testnet/contract/${result.contractId}`);
	console.log(`Contract Token:    https://explorer.arkhia.io/#/testnet/token/${result.fungibleTokenId}`);
 }
  
 main();
  
