const { Router } = require('express');
require("dotenv").config();

const router = Router();


const {
    Wallet,
    LocalProvider,
    PrivateKey,
    PublicKey,
    Hbar,
    AccountId,
    AccountBalanceQuery,
    AccountInfoQuery,
    TransferTransaction,
    Client,
  } = require("@hashgraph/sdk");
  
  const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
  const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
  const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
  const treasuryKey = PrivateKey.fromString(process.env.TREASURY_PVKEY);
  const numAccountsToCreate = 5// Change this to the number of accounts you want to create
  
  const client = Client.forTestnet().setOperator(operatorId, operatorKey);
  
  // Define the handler function
  const handler = async (req, res) => {
    try {
      if (process.env.OPERATOR_ID == null || process.env.OPERATOR_PVKEY == null) {
        throw new Error(
          "Environment variables OPERATOR_ID and OPERATOR_PVKEY are required."
        );
      }
  
      const wallet = new Wallet(
        process.env.OPERATOR_ID,
        process.env.OPERATOR_PVKEY,
        new LocalProvider()
      );
      const accounts = [];
      for (let i = 0; i < numAccountsToCreate; i++) {
        console.log(`Creating alias account ${i + 1}`);
  
        const privateKey = PrivateKey.generateED25519();
        const publicKey = privateKey.publicKey;
  
        const aliasAccountId = publicKey.toAccountId(0, 0);
  
        console.log(`New account ID: ${aliasAccountId.toString()}`);
        console.log(`The aliasKey: ${aliasAccountId.aliasKey.toString()}`);
  
        console.log("Transferring some Hbar to the new account");
        let transaction = await new TransferTransaction()
          .addHbarTransfer(wallet.getAccountId(), new Hbar(15).negated())
          .addHbarTransfer(aliasAccountId, new Hbar(15))
          .freezeWithSigner(wallet);
          
        transaction = await transaction.signWithSigner(wallet);
  
        const response = await transaction.executeWithSigner(wallet);
        await response.getReceiptWithSigner(wallet);
  
        const balance = await new AccountBalanceQuery()
          .setNodeAccountIds([response.nodeId])
          .setAccountId(aliasAccountId)
          .executeWithSigner(wallet);
        const new_account = {
          account_id: `${aliasAccountId.toString()}`,
          balance: balance,
        };
        accounts.push(new_account);
        console.log(`Balances of the new account: ${balance.toString()}`);
  
        const info = await new AccountInfoQuery()
          .setNodeAccountIds([response.nodeId])
          .setAccountId(aliasAccountId)
          .executeWithSigner(wallet);
  
        console.log(`Info about the new account: ${info.toString()}`);
      }
  
      console.log("All accounts created and funded!");
  
      // Respond with a success message
      return res
        .status(200)
        .json({ message: "All accounts created and funded!", data: accounts });
    } catch (error) {
      // Handle errors and respond with an error message
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  // Define a route for the handler
  router.get("/create-accounts", handler);

module.exports = router;