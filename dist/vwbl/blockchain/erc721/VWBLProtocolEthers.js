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
import { ethers } from "ethers";
import * as vwbl from "../../../contract/VWBL.json";
import * as vwblIPFS from "../../../contract/VWBLSupportIPFS.json";
var VWBLNFTEthers = /** @class */ (function () {
    function VWBLNFTEthers(address, isIpfs, ethersProvider, ethersSigner) {
        this.ethersProvider = ethersProvider;
        this.ethersSigner = ethersSigner;
        this.contract = isIpfs
            ? new ethers.Contract(address, vwblIPFS.abi, ethersSigner)
            : new ethers.Contract(address, vwbl.abi, ethersSigner);
    }
    VWBLNFTEthers.prototype.mintToken = function (decryptUrl, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, tx, receipt, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFee()];
                    case 1:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.mint(decryptUrl, royaltiesPercentage, documentId, { value: fee })];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, this.ethersProvider.waitForTransaction(tx.hash)];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenId = parseToTokenId(receipt);
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.mintTokenForIPFS = function (metadataUrl, decryptUrl, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, tx, receipt, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFee()];
                    case 1:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.mint(metadataUrl, decryptUrl, royaltiesPercentage, documentId, { value: fee })];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, this.ethersProvider.waitForTransaction(tx.hash)];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenId = parseToTokenId(receipt);
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getOwnTokenIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersSigner.getAddress()];
                    case 1:
                        myAddress = _a.sent();
                        return [4 /*yield*/, this.contract.callStatic.balanceOf(myAddress)];
                    case 2:
                        balance = _a.sent();
                        return [4 /*yield*/, Promise.all(range(Number.parseInt(balance)).map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                                var ownTokenId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.contract.callStatic.tokenOfOwnerByIndex(myAddress, i)];
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
    VWBLNFTEthers.prototype.getTokenByMinter = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.getTokenByMinter(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getMetadataUrl = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.tokenURI(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getOwner = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.ownerOf(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getMinter = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.getMinter(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.isOwnerOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersSigner.getAddress()];
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
    VWBLNFTEthers.prototype.isMinterOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, minter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersSigner.getAddress()];
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
    VWBLNFTEthers.prototype.getFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.getFee()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getTokenInfo = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.tokenIdToTokenInfo(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.approve = function (operator, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.approve(operator, tokenId)];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, this.ethersProvider.waitForTransaction(tx.hash)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.getApproved = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.getApproved(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.setApprovalForAll = function (operator) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.setApprovalForAll(operator, true)];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, this.ethersProvider.waitForTransaction(tx.hash)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.isApprovedForAll = function (owner, operator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.callStatic.isApprovedForAll(owner, operator)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLNFTEthers.prototype.safeTransfer = function (to, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersSigner.getAddress()];
                    case 1:
                        myAddress = _a.sent();
                        return [4 /*yield*/, this.contract.safeTransferFrom(myAddress, to, tokenId)];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, this.ethersProvider.waitForTransaction(tx.hash)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VWBLNFTEthers;
}());
export { VWBLNFTEthers };
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
