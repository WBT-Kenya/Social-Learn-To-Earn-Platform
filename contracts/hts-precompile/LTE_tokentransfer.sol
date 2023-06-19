
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19; //>=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;
 
import './HederaResponseCodes.sol';
import './IHederaTokenService.sol';
import './HederaTokenService.sol';
import './ExpiryHelper.sol';
import './KeyHelper.sol';
import './examples/token-create/TokenCreateContract.sol';
import './examples/token-create/TokenCreateCustom.sol';
import './examples/token-transfer/TokenTransferContract.sol';

contract LTE_tokentransfer is HederaTokenService, ExpiryHelper, KeyHelper {

    event ResponseCode(int responseCode);

    function cryptoTransferPublic(IHederaTokenService.TransferList calldata transferList, IHederaTokenService.TokenTransferList[] calldata tokenTransferList) public returns (int responseCode) {
        responseCode = HederaTokenService.cryptoTransfer(transferList, tokenTransferList);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert();
        }
    }

    function transferTokensPublic(address token, address[] memory accountId, int64[] memory amount) external returns (int256 responseCode) {
        responseCode = HederaTokenService.transferTokens(token, accountId, amount);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }
    }
}