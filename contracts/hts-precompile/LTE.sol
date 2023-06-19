
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

    string creatorName = "creatorName";
    string name = "tokenName";
    string symbol = "tokenSymbol";
    string memo = "memo";
    int64 initialTokenSupply = 10000;
    int64 maxSupply = 10000;
    int32 decimals = 8;
    bool freezeDefaultStatus = false;

    event ResponseCode(int responseCode);
    event CreatedToken(address tokenAddress);
    event MintedToken(int64 newTotalSupply, int64[] serialNumbers);
    event KycGranted(bool kycGranted);

    // Memo struct.
    struct LTELearner {
        address from;
        uint256 timestamp;
        string name;
        string message;
        uint256 score;
    }

     address payable public owner;//stores ethereum accounts
    constructor(string memory _creatorName, string memory _tokenName, string memory _tokenSymbol, int64 _initialTokenSupply)  {
        
        //owner = payable(msg.sender);
        creatorName = _creatorName;
        _tokenName = _tokenName;
        _tokenSymbol = _tokenSymbol;
        initialTokenSupply = _initialTokenSupply;
    
    }
        LTELearner[] lTELearners;

    mapping(address => bool) public authenticatedUsers;
    
    event UserAuthenticated(address indexed user);

    function authenticate() public {
        authenticatedUsers[msg.sender] = true;
        emit UserAuthenticated(msg.sender);
    }
    function isUserAuthenticated(address user) public view returns (bool) {
        return authenticatedUsers[user];
    }

    function sendAssessmentResult(string memory _name, string memory _message, uint256 _score) external payable returns (uint)  {

        require(_score > 50, "Qualified to earn tokens :)");

        lTELearners.push(LTELearner(
            msg.sender,
            block.timestamp,
            _name,
            _message,
            _score
            
        ));

        //for every qualified score, the total value of tokenSupply will reduce because token will be given to learner.
        initialTokenSupply -= 10000;

        return msg.value;
    }

    function createFungibleToken(
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
        HederaTokenService.createFungibleToken(token, initialTokenSupply, decimals);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }

        emit CreatedToken(tokenAddress);
    }

    function mintFungibleToken(address token, int64 amount, bytes[] memory metadata) public
    returns (int responseCode, int64 newTotalSupply, int64[] memory serialNumbers)  {
        (responseCode, newTotalSupply, serialNumbers) = HederaTokenService.mintToken(token, amount, metadata);
        emit ResponseCode(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert();
        }

        emit MintedToken(newTotalSupply, serialNumbers);
    }

}

