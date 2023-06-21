// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "../../HederaTokenService.sol";
import "../../ExpiryHelper.sol";
import "../../KeyHelper.sol";

contract TokenTransferContract is HederaTokenService, ExpiryHelper, KeyHelper {

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

    function transferTokenPublic(address token, address sender, address receiver, int64 amount) public returns (int responseCode) {
        responseCode = HederaTokenService.transferToken(token, sender, receiver, amount);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert();
        }
    }

    function transferFromPublic(address token, address from, address to, uint256 amount) public returns (int64 responseCode) {
        responseCode = this.transferFrom(token, from, to, amount);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }
    }

    function setApprovalForAllPublic(address token, address operator, bool approved) public returns (int responseCode) {
        responseCode = HederaTokenService.setApprovalForAll(token, operator, approved);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert();
        }
    }

    function approvePublic(address token, address spender, uint256 amount) public returns (int responseCode) {
    responseCode = HederaTokenService.approve(token, spender, amount);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }
    }

}
