const ethers = require('ethers');
const fs = require("fs");
console.clear();
// require("dotenv").config({path: '../.env'});
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
	TokenAssociateTransaction
	
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
const maryId = AccountId.fromString(process.env.MARY_ID);
const maryKey = PrivateKey.fromString(process.env.MARY_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generate();

// smartcontract

// async function createSmartContract() {
// 	const bytecode =  fs.readFileSync("./contracts/hts-precompile/build/LTE_sol_LTE.bin");
  
// 	  let contractCreate = new ContractCreateFlow()
// 		.setGas(10000000)
// 		.setBytecode(bytecode); //(contract.bytecode);
  
// 	  //Sign the transaction with the client operator key and submit to a Hedera network
// 	  const txResponse = contractCreate.execute(client);
  
// 	  // Get the receipt of the file create transaction
	
// 	  const receipt = (await txResponse).getReceipt(client);
  
// 	  // Get the new contract ID from the receipt
  
// 	  const newContractId = (await receipt).contractId;
  
// 	  // Log the file ID
// 	  console.log("The smart contract ID is " + newContractId);
// }	
// createSmartContract(); 

		async function createFungibleToken() {
			
			
			//CREATE FUNGIBLE TOKEN (HBAR,STABLECOIN)
			let tokenCreateTx = await new TokenCreateTransaction()
				.setTokenName("AWoW3")
				.setTokenSymbol("ABC")
				.setTokenType(TokenType.FungibleCommon)
				.setDecimals(2)
				.setInitialSupply(30000)
				.setTreasuryAccountId(treasuryId)
				.setSupplyType(TokenSupplyType.Infinite)
				.setSupplyKey(supplyKey)
				.freezeWith(client);	
					
			let tokenCreateSign = await tokenCreateTx.sign(treasuryKey);
			let tokenCreateSubmit = await tokenCreateSign.execute(client);
			let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
			let tokenId = tokenCreateRx.tokenId;
			console.log(`- Created token with ID: ${tokenId} \n`);

			//TOKEN ASSOCIATION WITH MARY's ACCOUNT

				// async function associateToken(client, tokenId, privateKey) {

				// 	const associateToken = await tokenHandler.associateToken([tokenId], client.operatorAccountId, client);
				// 	const associateTokenReceipt = await signHandler.signTransaction(associateToken, client, privateKey);
				// 	console.log(`Token ${tokenId} associated to private Key ${privateKey} / Account Id ${client.operatorAccountId}`);
				// 	console.log(associateTokenReceipt);
				// 	console.log(associateTokenReceipt.status);
				// }

				
				let associateMaryTx = await new TokenAssociateTransaction()
					.setAccountId(maryId)
					.setTokenIds([tokenId])
					.freezeWith(client)
					.sign(maryKey);

					//submit the transaction
					let associateMaryTxSubmit = await associateMaryTx.execute(client);

					// get the receipt of the transaction
					let associateMaryRx = await associateMaryTxSubmit.getReceipt(client);

					// log the transaction status
					console.log(`- Token association with Mary's account: ${associateMaryRx.status} \n`);
				

				
			
			//BALANCE CHECK
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
				console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(maryId).execute(client);
				console.log(`-Mary's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);

			// TRANSFER TOKEN FROM TREASURY TO MARY
				let tokenTransferTx = await new TransferTransaction()
					.addTokenTransfer(tokenId, treasuryId, -1000)
					.addTokenTransfer(tokenId, maryId, 1000)
					.freezeWith(client)
					.sign(treasuryKey);
				let tokenTransferSubmit = await tokenTransferTx.execute(client);
				let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
				console.log(`\n- Token transfer from Treasury to Mary: ${tokenTransferRx.status} \n`);

				//BALANCE CHECK
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
				console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
				var balanceCheckTx = await new AccountBalanceQuery().setAccountId(maryId).execute(client);
				console.log(`- Mary's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);

			}	
	


		createFungibleToken();




