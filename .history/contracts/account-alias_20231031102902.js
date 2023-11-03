

// main();

const express = require('express');
const app = express();

// Load environment variables from .env file
require('dotenv').config();

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
    Client
} = require("@hashgraph/sdk");

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
const treasuryKey = PrivateKey.fromString(process.env.TREASURY_PVKEY);
const numAccountsToCreate = 10; // Change this to the number of accounts you want to create

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
    
            console.log(`Balances of the new account: ${balance.toString()}`);
    
            const info = await new AccountInfoQuery()
                .setNodeAccountIds([response.nodeId])
                .setAccountId(aliasAccountId)
                .executeWithSigner(wallet);
    
            console.log(`Info about the new account: ${info.toString()}`);
        }
    
        console.log("All accounts created and funded!");
    
        // Respond with a success message
        res.status(200).send("All accounts created and funded!");
    } catch (error) {
        // Handle errors and respond with an error message
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// Define a route for the handler
app.get('/create-accounts', handler);

// Start the Express app on port 8080 (or your desired port)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
