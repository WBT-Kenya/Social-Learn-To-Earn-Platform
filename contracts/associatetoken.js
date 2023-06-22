const ethers = require('ethers');
const fs = require("fs");
console.clear();
require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	TransferTransaction,
	AccountBalanceQuery,
	ContractCreateFlow,
	Hbar,
	TokenMintTransaction
	
} = require("@hashgraph/sdk");
// const { TokenSupplyType } = require('@hashgraph/sdk');
const clientHandler = require('../contracts/hedera.sdk/handlers/clientHandler');
const signHandler = require("../contracts/hedera.sdk/handlers/signHandler");
const tokenHandler = require('../contracts/hedera.sdk/handlers/tokenHandler');

// Configure accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
const treasuryKey = PrivateKey.fromString(process.env.TREASURY_PVKEY);
const bobId = AccountId.fromString(process.env.BOB_ID);
const bobKey = PrivateKey.fromString(process.env.BOB_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generate();

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
createSmartContract(); 
  
  // Call the async function

		async function createFungibleToken() {
			
			
			//CREATE FUNGIBLE TOKEN (STABLECOIN)
			let tokenCreateTx = await new TokenCreateTransaction()
				.setTokenName("AWoW3")
				.setTokenSymbol("ABC")
				.setTokenType(TokenType.FungibleCommon)
				.setDecimals(2)
				.setInitialSupply(20000)
				.setTreasuryAccountId(treasuryId)
				.setSupplyType(TokenSupplyType.Infinite)
				.setSupplyKey(supplyKey)
				.freezeWith(client);	
					
			let tokenCreateSign = await tokenCreateTx.sign(treasuryKey);
			let tokenCreateSubmit = await tokenCreateSign.execute(client);
			let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
			let tokenId = tokenCreateRx.tokenId;
			console.log(`- Created token with ID: ${tokenId} \n`);

			//TOKEN ASSOCIATION WITH BOB's ACCOUNT

				async function associateToken(client, tokenId, privateKey) {

					const associateToken = await tokenHandler.associateToken([tokenId], client.operatorAccountId, client);
					const associateTokenReceipt = await signHandler.signTransaction(associateToken, client, privateKey);
					console.log(`Token ${tokenId} associated to private Key ${privateKey} / Account Id ${client.operatorAccountId}`);
					console.log(associateTokenReceipt);
					console.log(associateTokenReceipt.status);
				}
			
			//BALANCE CHECK
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
				console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(bobId).execute(client);
				console.log(`- Bob's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);

			//TRANSFER TOKEN FROM TREASURY TO BOB
				let tokenTransferTx = await new TransferTransaction()
					.addTokenTransfer(tokenId, treasuryId, -2500)
					.addTokenTransfer(tokenId, bobId, 2500)
					.freezeWith(client)
					.sign(treasuryKey);
				let tokenTransferSubmit = await tokenTransferTx.execute(client);
				let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
				console.log(`\n- Token transfer from Treasury to Bob: ${tokenTransferRx.status} \n`);

				//BALANCE CHECK
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
				console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(bobId).execute(client);
				console.log(`- Bob's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);

			}	
	


createFungibleToken();




