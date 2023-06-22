const { describe, it } = require('mocha');

const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require('../utils');
const { expectValidHash } = require('../assertions');
const Constants = require('../../constants')
const { TokenCreateTransaction, TransactionId, PublicKey, TokenSupplyType, AccountId } = require("@hashgraph/sdk");

describe("AssociateTokenCreate Test Suite", function () {
  let tokenCreateContract;
  let tokenCreateCustomContract;
  let tokenTransferContract;
  let tokenManagmentContract;
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
    tokenTransferContract = await utils.deployTokenTransferContract();
    tokenManagmentContract = await utils.deployTokenManagementContract();
    erc20Contract = await utils.deployERC20Contract();
    erc721Contract = await utils.deployERC721Contract();
    tokenAddress = await utils.createFungibleToken(tokenCreateContract, signers[0].address());
    mintedTokenSerialNumber = await utils.mintFT(tokenCreateContract, ftTokenAddress);

    await utils.associateToken(tokenCreateContract, tokenAddress, Constants.Contract.TokenCreateContract);
    await utils.associateToken(tokenCreateContract, nftTokenAddress, Constants.Contract.TokenCreateContract);
  });

  
  it('should be able to execute dissociateTokens and associateTokens', async function () {
    const tokenCreateContractWallet3 = tokenCreateContract.connect(signers[2]);
    const tokenManagmentContractWallet3 = tokenManagmentContract.connect(signers[2]);

    const txDisassociate = await tokenManagmentContractWallet3.dissociateTokensPublic(signers[2].address, [tokenAddress], Constants.GAS_LIMIT_1_000_000);
    const receiptDisassociate = await txDisassociate.wait();
    expect(receiptDisassociate.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args.responseCode).to.equal(22);

    const txAssociate = await tokenCreateContractWallet3.associateTokensPublic(signers[2].address, [tokenAddress], Constants.GAS_LIMIT_1_000_000);
    const receiptAssociate = await txAssociate.wait();
    expect(receiptAssociate.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args.responseCode).to.equal(22);
  });

  it('should be able to execute dissociateToken and associateToken', async function () {
    const tokenCreateContractWallet3 = tokenCreateContract.connect(signers[2]);
    const tokenManagmentContractWallet3 = tokenManagmentContract.connect(signers[2]);

    const txDisassociate = await tokenManagmentContractWallet3.dissociateTokenPublic(signers[2].address, tokenAddress, Constants.GAS_LIMIT_1_000_000);
    const receiptDisassociate = await txDisassociate.wait();
    expect(receiptDisassociate.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args.responseCode).to.equal(22);

    const txAssociate = await tokenCreateContractWallet3.associateTokenPublic(signers[2].address, tokenAddress, Constants.GAS_LIMIT_1_000_000);
    const receiptAssociate = await txAssociate.wait();
    expect(receiptAssociate.events.filter(e => e.event === Constants.Events.ResponseCode)[0].args.responseCode).to.equal(22);
  });

  it('should be able to execute createFungibleToken', async function () {
    const tokenAddressTx = await tokenCreateContract.createFungibleTokenPublic(tokenCreateContract.address, {
      value: ethers.BigNumber.from('10000000000000000000'),
      gasLimit: 1_000_000
    });
    const tokenAddressReceipt = await tokenAddressTx.wait();
    const result = tokenAddressReceipt.events.filter(e => e.event === Constants.Events.CreatedToken)[0].args[0];
    expect(result).to.exist;
    expectValidHash(result, 40)
  });
   
  });
