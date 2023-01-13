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
import * as vwbl1155 from "../../../contract/VWBLERC1155.json";
import * as vwbl1155IPFS from "../../../contract/VWBLERC1155SupportIPFS.json";
var VWBLERC1155Contract = /** @class */ (function () {
    function VWBLERC1155Contract(web3, address, isIpfs) {
        this.web3 = web3;
        this.contract = isIpfs
            ? new web3.eth.Contract(vwbl1155IPFS.abi, address)
            : new web3.eth.Contract(vwbl1155.abi, address);
    }
    VWBLERC1155Contract.prototype.mintToken = function (decryptUrl, amount, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, fee, receipt, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getFee()];
                    case 2:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.methods.mint(decryptUrl, amount, royaltiesPercentage, documentId).send({
                                from: myAddress,
                                value: fee,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenId = receipt.events.TransferSingle.returnValues.id;
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.batchMintToken = function (decryptUrl, amount, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, fee, receipt, tokenIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getFee()];
                    case 2:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.methods.mintBatch(decryptUrl, amount, royaltiesPercentage, documentId).send({
                                from: myAddress,
                                value: fee,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenIds = receipt.events.TransferBatch.returnValues.ids;
                        return [2 /*return*/, tokenIds];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.mintTokenForIPFS = function (metadataUrl, decryptUrl, amount, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, fee, receipt, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getFee()];
                    case 2:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.methods
                                .mint(metadataUrl, decryptUrl, amount, royaltiesPercentage, documentId)
                                .send({
                                from: myAddress,
                                value: fee,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenId = receipt.events.TransferSingle.returnValues.id;
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.batchMintTokenForIPFS = function (metadataUrl, decryptUrl, amount, royaltiesPercentage, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, fee, receipt, tokenIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getFee()];
                    case 2:
                        fee = _a.sent();
                        console.log("transaction start");
                        return [4 /*yield*/, this.contract.methods
                                .mintBatch(metadataUrl, decryptUrl, amount, royaltiesPercentage, documentId)
                                .send({
                                from: myAddress,
                                value: fee,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 3:
                        receipt = _a.sent();
                        console.log("transaction end");
                        tokenIds = receipt.events.TransferBatch.returnValues.ids;
                        return [2 /*return*/, tokenIds];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getOwnTokenIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contract.methods.tokenCountOfOwner(myAddress).call()];
                    case 2:
                        balance = _a.sent();
                        return [4 /*yield*/, Promise.all(range(Number.parseInt(balance)).map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                                var ownTokenId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.contract.methods.tokenOfOwnerByIndex(myAddress, i).call()];
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
    VWBLERC1155Contract.prototype.getTokenByMinter = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.getTokenByMinter(address).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getMetadataUrl = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.uri(tokenId).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getOwner = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.ownerOf(tokenId).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getMinter = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.getMinter(tokenId).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.isOwnerOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getOwner(tokenId)];
                    case 2:
                        owner = _a.sent();
                        return [2 /*return*/, myAddress === owner];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.isMinterOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress, minter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.getMinter(tokenId)];
                    case 2:
                        minter = _a.sent();
                        return [2 /*return*/, myAddress === minter];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.getFee().call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.getTokenInfo = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.tokenIdToTokenInfo(tokenId).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.setApprovalForAll = function (operator) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contract.methods.setApprovalForAll(operator, true).send({
                                from: myAddress,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.isApprovedForAll = function (owner, operator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.isApprovedForAll(owner, operator).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.safeTransfer = function (to, tokenId, amount, data) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contract.methods.safeTransferFrom(myAddress, to, tokenId, amount, data).send({
                                from: myAddress,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.balanceOf = function (owner, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.balanceOf(owner, tokenId).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.balanceOfBatch = function (owners, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.balanceOfBatch(owners, tokenIds).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.burn = function (owner, tokenId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contract.methods.burn(owner, tokenId, amount).send({
                                from: myAddress,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VWBLERC1155Contract.prototype.burnBatch = function (owner, tokenIds, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        myAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contract.methods.burnBatch(owner, tokenIds, amount).send({
                                from: myAddress,
                                maxPriorityFeePerGas: null,
                                maxFeePerGas: null,
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return VWBLERC1155Contract;
}());
export { VWBLERC1155Contract };
var range = function (length) {
    return Array.from(Array(length).keys());
};
