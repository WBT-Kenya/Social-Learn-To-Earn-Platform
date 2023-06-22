
//const {expect} = require("chai");
const {ethers} = require("hardhat");
const utils = require('../utils');
const Constants = require('../../constants')
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("AssociateTokenTransferTest Test Suite", function () {

  const TX_SUCCESS_CODE = 22;

  let tokenCreateContract;
  let tokenTransferContract;
  let tokenQueryContract;
  let erc20Contract;
  let erc721Contract;
  let tokenAddress;
  let ftTokenAddress;
  let mintedTokenSerialNumber;
  let signers;

  before(async function () {
    signers = await ethers.getSigners();
    tokenCreateContract = await utils.deployTokenCreateContract();
    tokenQueryContract = await utils.deployTokenQueryContract();
    tokenTransferContract = await utils.deployTokenTransferContract();
    erc20Contract = await utils.deployERC20Contract();
    erc721Contract = await utils.deployERC721Contract();

    tokenAddress = await utils.createFungibleToken(tokenCreateContract, signers[0].address());
    ftTokenAddress = await utils.createNonFungibleToken(tokenCreateContract, signers[0].address());
    mintedTokenSerialNumber = await utils.mintFTToAddress(tokenCreateContract, ftTokenAddress);

    await utils.associateToken(tokenCreateContract, tokenAddress, Constants.Contract.TokenCreateContract);
    await utils.associateToken(tokenCreateContract, ftTokenAddress, Constants.Contract.TokenCreateContract);
    await utils.grantTokenKyc(tokenCreateContract, ftTokenAddress);
  });

  it("should NOT be able to use transferFrom on fungible tokens without approval", async function () {
    const amount = 1;
    try {
      const txTransfer = await tokenTransferContract.transferFromPublic(tokenAddress, signers[0].address, signers[1].address, amount, Constants.GAS_LIMIT_1_000_000);
      await txTransfer.wait();
      expect.fail();
    } catch(e) {
      expect(e).to.exist;
      expect(e.reason).to.eq('transaction failed');
    }
  });


  it('should be able to execute transferTokens', async function () {
    const amount = 33;
    const signers = await ethers.getSigners();


    let tokenTransferSubmit = await tokenTransferTx.execute(client);
	let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    let wallet1BalanceBefore = await erc20Contract.balanceOf(tokenAddress, signers[0].address);
    let wallet2BalanceBefore = await erc20Contract.balanceOf(tokenAddress, signers[1].address);
    let wallet3BalanceBefore = await erc20Contract.balanceOf(tokenAddress, signers[2].address);
    await tokenTransferContract.transferTokensPublic(tokenAddress, [signers[0].address, signers[1].address], [-amount, amount], Constants.GAS_LIMIT_1_000_000);
    let wallet1BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[0].address);
    let wallet2BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[1].address);
    let wallet3BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[2].address);

    expect(wallet1BalanceAfter).to.equal(wallet1BalanceBefore - amount);
    expect(wallet2BalanceAfter).to.equal(wallet2BalanceBefore + amount);
    expect(wallet3BalanceAfter).to.equal(wallet3BalanceBefore + amount);
  });


  it('should be able to execute transferToken', async function () {
    const amount = 33;
    const signers = await ethers.getSigners();

    let wallet1BalanceBefore = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[0].address));
    let wallet2BalanceBefore = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[1].address));
    let wallet3BalanceBefore = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[2].address));
    await tokenTransferContract.transferTokenPublic(tokenAddress, signers[0].address, signers[1].address, amount, Constants.GAS_LIMIT_1_000_000);
    let wallet1BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[0].address);
    let wallet2BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[1].address);
    let wallet3BalanceAfter = await erc20Contract.balanceOf(tokenAddress, signers[2].address);

    expect(wallet1BalanceAfter).to.equal(wallet1BalanceBefore - amount);
    expect(wallet2BalanceAfter).to.equal(wallet2BalanceBefore + amount);
    expect(wallet3BalanceAfter).to.equal(wallet3BalanceBefore + amount);
  });

 

  it("should be able to execute getApproved", async function () {
    const approvedTx = await tokenQueryContract.getApprovedPublic(nftTokenAddress, mintedTokenSerialNumber, Constants.GAS_LIMIT_1_000_000);
    const receipt = await approvedTx.wait();
    const responseCode = receipt.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args[0];
    const approved = receipt.events.filter(e => e.event === Constants.Events.ApprovedAddress)[0].args[0];

    expect(responseCode).to.equal(TX_SUCCESS_CODE);
    expect(approved).to.equal('0x0000000000000000000000000000000000000000');
  });

  it('should be able to execute cryptoTransfer with both 3 txs', async function () {
    const amount = 1;
    await tokenTransferContract.transferTokenPublic(tokenAddress, tokenCreateContract.address, signers[0].address, amount, Constants.GAS_LIMIT_1_000_000);

    const mintedTokenSerialNumber = await utils.mintNFT(tokenCreateContract, nftTokenAddress);
    await tokenTransferContract.transferNFTsPublic(nftTokenAddress, [tokenCreateContract.address], [signers[0].address], [mintedTokenSerialNumber], Constants.GAS_LIMIT_1_000_000);

    const signers0BeforeHbarBalance = await signers[0].provider.getBalance(signers[0].address);
    const signers1BeforeHbarBalance = await signers[0].provider.getBalance(signers[1].address);
    const signers2BeforeHbarBalance = await signers[0].provider.getBalance(signers[2].address);
    const signers0BeforeTokenBalance = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[0].address));
    const signers1BeforeTokenBalance = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[1].address));
    const signers2BeforeTokenBalance = parseInt(await erc20Contract.balanceOf(tokenAddress, signers[2].address));
    const ftOwnerBefore = await erc721Contract.ownerOf(ftTokenAddress, mintedTokenSerialNumber);

    const cryptoTransfers = {
      transfers: [
        {
          accountID: signers[0].address,
          amount: -10_000
        },
        {
          accountID: signers[1].address,
          amount: 10_000
        },
        {
          accountID: signers[2].address,
          amount: 10_000
        }
      ]
    };

    let tokenTransferList = [{
      token: tokenAddress,
      transfers: [
        {
            accountID: signers[2].address,
            amount: amount,
          },
        {
          accountID: signers[1].address,
          amount: amount,
        },
        {
          accountID: signers[0].address,
          amount: -amount,
        },
      ],
      ftTransfers: [],
    }, {
      token: nftTokenAddress,
      transfers: [],
      ftTransfers: [{
        senderAccountID: signers[0].address,
        receiverAccountID: signers[1].address,
        serialNumber: mintedTokenSerialNumber
      }],
    }];
//execute, verify balances, check the owner of the ft, 
    const cryptoTransferTx = await tokenTransferContract.cryptoTransferPublic(cryptoTransfers, tokenTransferList, Constants.GAS_LIMIT_1_000_000);
    const cryptoTransferReceipt = await cryptoTransferTx.wait();
    const responseCode = cryptoTransferReceipt.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args[0];

    const signers0AfterHbarBalance = await signers[0].provider.getBalance(signers[0].address);
    const signers1AfterHbarBalance = await signers[0].provider.getBalance(signers[1].address);
    const signers2AfterHbarBalance = await signers[0].provider.getBalance(signers[2].address);
    const signers3AfterHbarBalance = await signers[0].provider.getBalance(signers[3].address);
    const signers0AfterTokenBalance = await erc20Contract.balanceOf(tokenAddress, signers[0].address);
    const signers1AfterTokenBalance = await erc20Contract.balanceOf(tokenAddress, signers[1].address);
    const signers2AfterTokenBalance = await erc20Contract.balanceOf(tokenAddress, signers[2].address);
    const signers3AfterTokenBalance = await erc20Contract.balanceOf(tokenAddress, signers[3].address);
    const ftOwnerAfter = await erc721Contract.ownerOf(ftTokenAddress, mintedTokenSerialNumber);

    expect(responseCode).to.equal(TX_SUCCESS_CODE);
    expect(signers0BeforeHbarBalance > signers0AfterHbarBalance).to.equal(true);
    expect(signers2AfterHbarBalance > signers2BeforeHbarBalance).to.equal(true);
    expect(signers1AfterHbarBalance > signers1BeforeHbarBalance).to.equal(true);
    expect(signers0BeforeTokenBalance - amount).to.equal(signers0AfterTokenBalance);
    expect(signers1BeforeTokenBalance + amount).to.equal(signers1AfterTokenBalance);
    expect(signers2BeforeTokenBalance + amount).to.equal(signers2AfterTokenBalance);
    expect(ftOwnerBefore).to.equal(signers[0].address);
    expect(ftOwnerAfter).to.equal(signers[1].address);
    
  });

});
