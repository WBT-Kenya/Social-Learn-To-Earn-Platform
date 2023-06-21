
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19; //>=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;
 
import './HederaResponseCodes.sol';
import './IHederaTokenService.sol';
import './HederaTokenService.sol';
import './ExpiryHelper.sol';
import "./KeyHelper.sol";
import './examples/token-create/TokenCreateContract.sol';
import './examples/token-create/TokenCreateCustom.sol';
import './examples/token-transfer/TokenTransferContract.sol';

 
contract LTE is HederaTokenService, ExpiryHelper, KeyHelper {

    string creatorName = "AWoW3";
    string name = "AWoW3";
    string symbol = "ABC";
    string memo = "memo";
    int64 initialTotalSupply = 10000;
    int64 maxSupply = 10000;
    int32 decimals = 8;
    bool freezeDefaultStatus = false;

    event ResponseCode(int responseCode);
    event CreatedToken(address tokenAddress);
    event MintedToken(int64 newTotalSupply, int64[] serialNumbers);
    event KycGranted(bool kycGranted);

    
    function createFungibleTokenPublic(
        address treasury
    ) public payable {
        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](5);
        keys[0] = getSingleKey(KeyType.ADMIN, KeyType.PAUSE, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));
        keys[1] = getSingleKey(KeyType.KYC, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));
        keys[2] = getSingleKey(KeyType.FREEZE, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));
        keys[3] = getSingleKey(KeyType.WIPE, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));
        keys[4] = getSingleKey(KeyType.SUPPLY, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));

        IHederaTokenService.Expiry memory expiry = IHederaTokenService.Expiry(
            0, treasury, 8000000
        );

        IHederaTokenService.HederaToken memory token = IHederaTokenService.HederaToken(
            name, symbol, treasury, memo, true, maxSupply, freezeDefaultStatus, keys, expiry
        );

        (int responseCode, address tokenAddress) =
        HederaTokenService.createFungibleToken(token, initialTotalSupply, decimals);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }

        emit CreatedToken(tokenAddress);
    }
    
    function mintTokenToAddressPublic(address token, int64 amount, bytes[] memory metadata) public
    returns (int responseCode, int64 newTotalSupply, int64[] memory serialNumbers)  {
        (responseCode, newTotalSupply, serialNumbers) = HederaTokenService.mintToken(token, amount, metadata);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert();
        }

        emit MintedToken(newTotalSupply, serialNumbers);

        HederaTokenService.transferNFT(token, address(this), msg.sender, serialNumbers[0]);
    }

    function tokenAssociate(address sender, address tokenAddress) external {
        int response = HederaTokenService.associateToken(sender, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Associate Failed");
        }
    }

    function tokenTransfer(address tokenId, address fromAccountId , address toAccountId , int64 tokenAmount) external {
        int response = HederaTokenService.transferToken(tokenId, fromAccountId, toAccountId, tokenAmount);

        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Transfer Failed");
        }
    }
  

}

