import { ethers } from "ethers";
var biconomyForwarderDomainData = {
    name: "Biconomy Forwarder",
    version: "1",
    verifyingContract: "",
    salt: "",
};
var domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
];
var forwardRequestType = [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "token", type: "address" },
    { name: "txGas", type: "uint256" },
    { name: "tokenGasPrice", type: "uint256" },
    { name: "batchId", type: "uint256" },
    { name: "batchNonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "data", type: "bytes" },
];
export var buildForwardTxRequest = function (account, toAddress, gasLimitNum, batchNonce, data) {
    var req = {
        from: account,
        to: toAddress,
        token: "0x0000000000000000000000000000000000000000",
        txGas: gasLimitNum,
        tokenGasPrice: "0",
        batchId: parseInt("0"),
        batchNonce: parseInt(batchNonce),
        deadline: Math.floor(Date.now() / 1000 + 3600),
        data: data,
    };
    return req;
};
export var getDataToSignForEIP712 = function (request, forwarderAddress, chainId) {
    var domainData = biconomyForwarderDomainData;
    domainData.verifyingContract = forwarderAddress;
    domainData.salt = ethers.utils.hexZeroPad(ethers.BigNumber.from(chainId).toHexString(), 32);
    var dataToSign = JSON.stringify({
        types: {
            EIP712Domain: domainType,
            ERC20ForwardRequest: forwardRequestType,
        },
        domain: domainData,
        primaryType: "ERC20ForwardRequest",
        message: request,
    });
    return dataToSign;
};
export var getDomainSeparator = function (forwarderAddress, chainId) {
    var domainSeparator = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32", "bytes32", "address", "bytes32"], [
        ethers.utils.id("EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)"),
        ethers.utils.id(biconomyForwarderDomainData.name),
        ethers.utils.id(biconomyForwarderDomainData.version),
        forwarderAddress,
        ethers.utils.hexZeroPad(ethers.BigNumber.from(chainId).toHexString(), 32),
    ]));
    return domainSeparator;
};
