var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from "axios";
import { ethers } from "ethers";
import * as forwarder from "../../../contract/Forwarder.json";
import * as vwblMetaTx from "../../../contract/VWBLMetaTx.json";
import * as vwblMetaTxIpfs from "../../../contract/VWBLMetaTxSupportIPFS.json";
import { buildForwardTxRequest, getDataToSignForEIP712, getDomainSeparator, } from "../../../util/biconomyHelper";
var VWBLNFTMetaTx = /** @class */ (function () {
    function VWBLNFTMetaTx(biconomyAPIKey, walletProvider, nftAddress, forwarderAddress) {
        this.biconomyAPIKey = biconomyAPIKey;
        this.walletProvider = walletProvider;
        this.nftAddress = nftAddress;
        this.forwarderAddress = forwarderAddress;
    }
    VWBLNFTMetaTx.prototype.mintToken = function (decryptUrl, royaltiesPercentage, documentId, mintApiId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, data, chainId, _a, txParam, sig, domainSeparator, receipt, tokenId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _b.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTx.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.populateTransaction.mint(decryptUrl, royaltiesPercentage, documentId)];
                    case 2:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, walletSigner.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        return [4 /*yield*/, this.constructMetaTx(myAddress, data, chainId)];
                    case 4:
                        _a = _b.sent(), txParam = _a.txParam, sig = _a.sig, domainSeparator = _a.domainSeparator;
                        console.log("transaction start");
                        return [4 /*yield*/, this.sendTransaction(txParam, sig, myAddress, domainSeparator, mintApiId, "EIP712_SIGN")];
                    case 5:
                        receipt = _b.sent();
                        console.log("transaction end");
                        tokenId = parseToTokenId(receipt);
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.mintTokenForIPFS = function (metadataUrl, decryptUrl, royaltiesPercentage, documentId, mintApiId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, data, chainId, _a, txParam, sig, domainSeparator, receipt, tokenId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _b.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.populateTransaction.mint(metadataUrl, decryptUrl, royaltiesPercentage, documentId)];
                    case 2:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, walletSigner.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        return [4 /*yield*/, this.constructMetaTx(myAddress, data, chainId)];
                    case 4:
                        _a = _b.sent(), txParam = _a.txParam, sig = _a.sig, domainSeparator = _a.domainSeparator;
                        console.log("transaction start");
                        return [4 /*yield*/, this.sendTransaction(txParam, sig, myAddress, domainSeparator, mintApiId, "EIP712_SIGN")];
                    case 5:
                        receipt = _b.sent();
                        console.log("transaction end");
                        tokenId = parseToTokenId(receipt);
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getOwnTokenIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _a.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.balanceOf(myAddress)];
                    case 2:
                        balance = _a.sent();
                        return [4 /*yield*/, Promise.all(range(Number.parseInt(balance)).map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                                var ownTokenId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, vwblMetaTxContract.callStatic.tokenOfOwnerByIndex(myAddress, i)];
                                        case 1:
                                            ownTokenId = _a.sent();
                                            return [2 /*return*/, Number.parseInt(ownTokenId)];
                                    }
                                });
                            }); }))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getTokenByMinter = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.getTokenByMinter(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getMetadataUrl = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.tokenURI(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getOwner = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.ownerOf(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getMinter = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.getMinter(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.isOwnerOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _a.sent();
                        return [4 /*yield*/, this.getOwner(tokenId)];
                    case 2:
                        owner = _a.sent();
                        return [2 /*return*/, myAddress === owner];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.isMinterOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, minter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _a.sent();
                        return [4 /*yield*/, this.getMinter(tokenId)];
                    case 2:
                        minter = _a.sent();
                        return [2 /*return*/, myAddress === minter];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.getFee()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getTokenInfo = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.tokenIdToTokenInfo(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.approve = function (operator, tokenId, approveApiId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, data, chainId, _a, txParam, sig, domainSeparator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _b.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.populateTransaction.approve(operator, tokenId)];
                    case 2:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, walletSigner.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        return [4 /*yield*/, this.constructMetaTx(myAddress, data, chainId)];
                    case 4:
                        _a = _b.sent(), txParam = _a.txParam, sig = _a.sig, domainSeparator = _a.domainSeparator;
                        console.log("transaction start");
                        return [4 /*yield*/, this.sendTransaction(txParam, sig, myAddress, domainSeparator, approveApiId, "EIP712_SIGN")];
                    case 5:
                        _b.sent();
                        console.log("transaction end");
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.getApproved = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.getApproved(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.setApprovalForAll = function (operator, setApprovalForAllApiId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, data, chainId, _a, txParam, sig, domainSeparator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _b.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.populateTransaction.setApprovalForAll(operator)];
                    case 2:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, walletSigner.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        return [4 /*yield*/, this.constructMetaTx(myAddress, data, chainId)];
                    case 4:
                        _a = _b.sent(), txParam = _a.txParam, sig = _a.sig, domainSeparator = _a.domainSeparator;
                        console.log("transaction start");
                        return [4 /*yield*/, this.sendTransaction(txParam, sig, myAddress, domainSeparator, setApprovalForAllApiId, "EIP712_SIGN")];
                    case 5:
                        _b.sent();
                        console.log("transaction end");
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.isApprovedForAll = function (owner, operator) {
        return __awaiter(this, void 0, void 0, function () {
            var vwblMetaTxContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, vwblMetaTxContract.callStatic.isApprovedForAll(owner, operator)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.safeTransfer = function (to, tokenId, safeTransferFromApiId) {
        return __awaiter(this, void 0, void 0, function () {
            var walletSigner, myAddress, vwblMetaTxContract, data, chainId, _a, txParam, sig, domainSeparator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletSigner = this.walletProvider.getSigner();
                        return [4 /*yield*/, walletSigner.getAddress()];
                    case 1:
                        myAddress = _b.sent();
                        vwblMetaTxContract = new ethers.Contract(this.nftAddress, vwblMetaTxIpfs.abi, walletSigner);
                        return [4 /*yield*/, vwblMetaTxContract.populateTransaction.safeTransferFrom(myAddress, to, tokenId)];
                    case 2:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, walletSigner.getChainId()];
                    case 3:
                        chainId = _b.sent();
                        return [4 /*yield*/, this.constructMetaTx(myAddress, data, chainId)];
                    case 4:
                        _a = _b.sent(), txParam = _a.txParam, sig = _a.sig, domainSeparator = _a.domainSeparator;
                        console.log("transaction start");
                        return [4 /*yield*/, this.sendTransaction(txParam, sig, myAddress, domainSeparator, safeTransferFromApiId, "EIP712_SIGN")];
                    case 5:
                        _b.sent();
                        console.log("transaction end");
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.constructMetaTx = function (myAddress, data, chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var gasLimit, forwarderContract, batchNonce, txParam, domainSeparator, dataToSign, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.walletProvider.estimateGas({
                            to: this.nftAddress,
                            from: myAddress,
                            data: data,
                        })];
                    case 1:
                        gasLimit = _a.sent();
                        forwarderContract = new ethers.Contract(this.forwarderAddress, forwarder.abi, this.walletProvider.getSigner());
                        return [4 /*yield*/, forwarderContract.getNonce(myAddress, 0)];
                    case 2:
                        batchNonce = _a.sent();
                        txParam = buildForwardTxRequest(myAddress, this.nftAddress, Number(gasLimit.toNumber().toString()), batchNonce, data);
                        domainSeparator = getDomainSeparator(this.forwarderAddress, chainId);
                        dataToSign = getDataToSignForEIP712(txParam, this.forwarderAddress, chainId);
                        return [4 /*yield*/, this.walletProvider.send("eth_signTypedData_v3", [myAddress, dataToSign])];
                    case 3:
                        sig = _a.sent();
                        return [2 /*return*/, { txParam: txParam, sig: sig, domainSeparator: domainSeparator }];
                }
            });
        });
    };
    VWBLNFTMetaTx.prototype.sendTransaction = function (request, sig, myAddress, domainSeparator, methodApiId, signatureType) {
        return __awaiter(this, void 0, void 0, function () {
            var params, headers, data, receipt, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = [request, domainSeparator, sig];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        headers = {
                            "x-api-key": this.biconomyAPIKey,
                            "content-Type": "application/json;charset=utf-8",
                        };
                        return [4 /*yield*/, axios.post("https://api.biconomy.io/api/v2/meta-tx/native", {
                                to: this.nftAddress,
                                apiId: methodApiId,
                                params: params,
                                from: myAddress,
                                signatureType: signatureType,
                            }, { headers: headers })];
                    case 2:
                        data = (_a.sent()).data;
                        console.log("post meta tx resp", data);
                        return [4 /*yield*/, this.walletProvider.waitForTransaction(data.txHash)];
                    case 3:
                        receipt = _a.sent();
                        console.log("confirmed:", data.txHash);
                        return [2 /*return*/, receipt];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("post meta tx error");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return VWBLNFTMetaTx;
}());
export { VWBLNFTMetaTx };
var range = function (length) {
    return Array.from(Array(length).keys());
};
var parseToTokenId = function (receipt) {
    var eventInterface = new ethers.utils.Interface([
        "event nftDataRegistered(address contractAddress, uint256 tokenId)",
    ]);
    var tokenId = 0;
    receipt.logs.forEach(function (log) {
        // check whether topic is nftDataRegistered(address contractAddress, uint256 tokenId)
        if (log.topics[0] === "0x957e0e652e4d598197f2c5b25940237e404f3899238efb6f64df2377e9aaf36c") {
            var description = eventInterface.parseLog({ topics: log.topics, data: log.data });
            tokenId = description.args[1].toNumber();
        }
    });
    return tokenId;
};
