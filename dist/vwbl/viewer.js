var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import * as vwblDataCollector from "../contract/VWBLDataCollector.json";
import { decryptFile, decryptString } from "../util/cryptoHelper";
import { VWBLBase } from "./base";
var VWBLViewer = /** @class */ (function (_super) {
    __extends(VWBLViewer, _super);
    function VWBLViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.sign = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sign(this.opts.web3)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getMetadata = function (contractAddress, tokenId) { return __awaiter(_this, void 0, void 0, function () {
            var metadataUrl, metadata;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getTokenURI(contractAddress, tokenId).call()];
                    case 1:
                        metadataUrl = _b.sent();
                        if (!metadataUrl)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, axios.get(metadataUrl).catch(function () { return undefined; })];
                    case 2:
                        metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                        if (!metadata)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, {
                                id: tokenId,
                                name: metadata.name,
                                description: metadata.description,
                                image: metadata.image,
                                mimeType: metadata.mime_type,
                                encryptLogic: metadata.encrypt_logic,
                                address: contractAddress,
                            }];
                }
            });
        }); };
        _this.listMetadata = function (contractAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getAllTokensFromOptionalContract(contractAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listMetadataFormMultiContracts = function (contracts) { return __awaiter(_this, void 0, void 0, function () {
            var allItems, _i, contracts_1, addr, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        allItems = [];
                        _i = 0, contracts_1 = contracts;
                        _a.label = 1;
                    case 1:
                        if (!(_i < contracts_1.length)) return [3 /*break*/, 4];
                        addr = contracts_1[_i];
                        return [4 /*yield*/, this.listMetadata(addr)];
                    case 2:
                        items = _a.sent();
                        allItems.push.apply(allItems, items);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, allItems];
                }
            });
        }); };
        _this.listAllOwnedMetadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getAllOwnedTokens(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listOwnedNFTMetadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getOwnedNFTs(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listOwnedERC1155Metadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getOwnedERC1155s(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listAllMintedMetadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getAllMintedTokens(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listMintedNFTMetadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getMintedNFTs(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.listMintedERC1155Metadata = function (userAddress) { return __awaiter(_this, void 0, void 0, function () {
            var tokens, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getMintedERC1155s(userAddress).call()];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, Promise.all(tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(token.tokenURI).catch(function () { return undefined; })];
                                        case 1:
                                            metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                                            if (!metadata)
                                                return [2 /*return*/, undefined];
                                            return [2 /*return*/, {
                                                    id: token.tokenId,
                                                    name: metadata.name,
                                                    description: metadata.description,
                                                    image: metadata.image,
                                                    mimeType: metadata.mime_type,
                                                    encryptLogic: metadata.encrypt_logic,
                                                    address: token.contractAddress,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); };
        _this.extractMetadata = function (contractAddress, tokenId, signature) { return __awaiter(_this, void 0, void 0, function () {
            var sig, metadataUrl, metadata, documentId, chainId, decryptKey, encryptedDataUrls, isRunningOnBrowser, encryptLogic, ownDataArray, ownFiles, ownDataBase64, fileName;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sig = this.signature || signature;
                        if (!sig)
                            throw new Error("please sign or set signature param");
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getTokenURI(contractAddress, tokenId).call()];
                    case 1:
                        metadataUrl = _c.sent();
                        if (!metadataUrl)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, axios.get(metadataUrl).catch(function () { return undefined; })];
                    case 2:
                        metadata = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.data;
                        if (!metadata)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, this.dataCollector.methods.getDocumentId(contractAddress, tokenId).call()];
                    case 3:
                        documentId = _c.sent();
                        return [4 /*yield*/, this.opts.web3.eth.getChainId()];
                    case 4:
                        chainId = _c.sent();
                        return [4 /*yield*/, this.api.getKey(documentId, chainId, sig)];
                    case 5:
                        decryptKey = _c.sent();
                        encryptedDataUrls = metadata.encrypted_data;
                        isRunningOnBrowser = typeof window !== "undefined";
                        encryptLogic = (_b = metadata.encrypt_logic) !== null && _b !== void 0 ? _b : "base64";
                        return [4 /*yield*/, Promise.all(encryptedDataUrls.map(function (encryptedDataUrl) { return __awaiter(_this, void 0, void 0, function () {
                                var encryptedData, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, axios.get(encryptedDataUrl, {
                                                responseType: encryptLogic === "base64" ? "text" : isRunningOnBrowser ? "arraybuffer" : "stream",
                                            })];
                                        case 1:
                                            encryptedData = (_b.sent()).data;
                                            if (!(encryptLogic === "base64")) return [3 /*break*/, 2];
                                            _a = decryptString(encryptedData, decryptKey);
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, decryptFile(encryptedData, decryptKey)];
                                        case 3:
                                            _a = _b.sent();
                                            _b.label = 4;
                                        case 4: return [2 /*return*/, _a];
                                    }
                                });
                            }); }))];
                    case 6:
                        ownDataArray = _c.sent();
                        ownFiles = ownDataArray.filter(function (ownData) { return typeof ownData !== "string"; });
                        ownDataBase64 = ownDataArray.filter(function (ownData) { return typeof ownData === "string"; });
                        fileName = encryptedDataUrls[0]
                            .split("/")
                            .slice(-1)[0]
                            .replace(/\.vwbl/, "");
                        return [2 /*return*/, {
                                id: tokenId,
                                name: metadata.name,
                                description: metadata.description,
                                image: metadata.image,
                                mimeType: metadata.mime_type,
                                encryptLogic: metadata.encrypt_logic,
                                ownDataBase64: ownDataBase64,
                                ownFiles: ownFiles,
                                fileName: fileName,
                            }];
                }
            });
        }); };
        _this.getNFTOwner = function (contractAddress, tokenId) { return __awaiter(_this, void 0, void 0, function () {
            var owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dataCollector)
                            throw new Error("please set dataCollectorAddress");
                        return [4 /*yield*/, this.dataCollector.methods.getNFTOwner(contractAddress, tokenId).call()];
                    case 1:
                        owner = _a.sent();
                        return [2 /*return*/, owner];
                }
            });
        }); };
        _this.opts = props;
        var web3 = props.web3, dataCollectorAddress = props.dataCollectorAddress;
        _this.dataCollector = new web3.eth.Contract(vwblDataCollector.abi, dataCollectorAddress);
        return _this;
    }
    return VWBLViewer;
}(VWBLBase));
export { VWBLViewer };
