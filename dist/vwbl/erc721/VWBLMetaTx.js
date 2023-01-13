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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { ethers, utils } from "ethers";
import { uploadEncryptedFile, uploadMetadata, uploadThumbnail } from "../../storage/aws/upload";
import { createRandomKey, decryptFile, decryptString, encryptFile, encryptString, } from "../../util/cryptoHelper";
import { getMimeType, toBase64FromBlob } from "../../util/fileHelper";
import { VWBLBase } from "../base";
import { VWBLNFTMetaTx } from "../blockchain";
import { StepStatus, UploadContentType, UploadMetadataType, } from "../types";
var VWBLMetaTx = /** @class */ (function (_super) {
    __extends(VWBLMetaTx, _super);
    function VWBLMetaTx(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Sign to VWBL
         *
         * @remarks
         * You need to call this method before you send a transaction（eg. mint NFT）
         */
        _this.sign = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sign(this.signer)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Create VWBL NFT
         *
         * @remarks
         * The following happens: Minting NFT, Uploading encrypted data, Uploading metadata, Setting key to VWBL Network
         * By default, metadata will be uploaded to Amazon S3.
         * You need to pass `uploadFileCallback` and `uploadMetadataCallBack` if you upload metadata to a storage other than Amazon S3.
         *
         * @param name - The NFT name
         * @param description - The NFT description
         * @param plainFile - The data that only NFT owner can view
         * @param thumbnailImage - The NFT image
         * @param royaltiesPercentage - This percentage of the sale price will be paid to the NFT creator every time the NFT is sold or re-sold
         * @param encryptLogic - Select ether "base64" or "binary". Selection criteria: "base64" -> sutable for small data. "binary" -> sutable for large data.
         * @param mintApiId - The mint method api id of biconomy
         * @param uploadEncryptedFileCallback - Optional: the function for uploading encrypted data
         * @param uploadThumbnailCallback - Optional: the function for uploading thumbnail
         * @param uploadMetadataCallBack - Optional: the function for uploading metadata
         * @param subscriber - Optional: the subscriber for seeing progress
         * @returns
         */
        _this.managedCreateToken = function (name, description, plainFile, thumbnailImage, royaltiesPercentage, encryptLogic, mintApiId, uploadEncryptedFileCallback, uploadThumbnailCallback, uploadMetadataCallBack, subscriber) {
            if (encryptLogic === void 0) { encryptLogic = "base64"; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, uploadContentType, uploadMetadataType, awsConfig, vwblNetworkUrl, documentId, tokenId, key, plainFileArray, uuid, uploadEncryptedFunction, uploadThumbnailFunction, encryptedDataUrls, thumbnailImageUrl, uploadMetadataFunction, mimeType, chainId;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.signature) {
                                throw "please sign first";
                            }
                            _a = this.opts, uploadContentType = _a.uploadContentType, uploadMetadataType = _a.uploadMetadataType, awsConfig = _a.awsConfig, vwblNetworkUrl = _a.vwblNetworkUrl;
                            documentId = utils.hexlify(utils.randomBytes(32));
                            return [4 /*yield*/, this.nft.mintToken(vwblNetworkUrl, royaltiesPercentage, documentId, mintApiId)];
                        case 1:
                            tokenId = _b.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.MINT_TOKEN);
                            key = createRandomKey();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.CREATE_KEY);
                            // 3. encrypt data
                            console.log("encrypt data");
                            plainFileArray = [plainFile].flat();
                            uuid = createRandomKey();
                            uploadEncryptedFunction = uploadContentType === UploadContentType.S3 ? uploadEncryptedFile : uploadEncryptedFileCallback;
                            uploadThumbnailFunction = uploadContentType === UploadContentType.S3 ? uploadThumbnail : uploadThumbnailCallback;
                            if (!uploadEncryptedFunction || !uploadThumbnailFunction) {
                                throw new Error("please specify upload file type or give callback");
                            }
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.ENCRYPT_DATA);
                            // 4. upload data
                            console.log("upload data");
                            return [4 /*yield*/, Promise.all(plainFileArray.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                    var encryptedContent, _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!(encryptLogic === "base64")) return [3 /*break*/, 2];
                                                _b = encryptString;
                                                return [4 /*yield*/, toBase64FromBlob(file)];
                                            case 1:
                                                _a = _b.apply(void 0, [_c.sent(), key]);
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, encryptFile(file, key)];
                                            case 3:
                                                _a = _c.sent();
                                                _c.label = 4;
                                            case 4:
                                                encryptedContent = _a;
                                                return [4 /*yield*/, uploadEncryptedFunction(file.name, encryptedContent, uuid, awsConfig)];
                                            case 5: return [2 /*return*/, _c.sent()];
                                        }
                                    });
                                }); }))];
                        case 2:
                            encryptedDataUrls = _b.sent();
                            return [4 /*yield*/, uploadThumbnailFunction(thumbnailImage, uuid, awsConfig)];
                        case 3:
                            thumbnailImageUrl = _b.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.UPLOAD_CONTENT);
                            // 5. upload metadata
                            console.log("upload meta data");
                            uploadMetadataFunction = uploadMetadataType === UploadMetadataType.S3 ? uploadMetadata : uploadMetadataCallBack;
                            if (!uploadMetadataFunction) {
                                throw new Error("please specify upload metadata type or give callback");
                            }
                            mimeType = getMimeType(plainFileArray[0]);
                            return [4 /*yield*/, uploadMetadataFunction(tokenId, name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic, awsConfig)];
                        case 4:
                            _b.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.UPLOAD_METADATA);
                            // 6. set key to vwbl-network
                            console.log("set key");
                            return [4 /*yield*/, this.signer.getChainId()];
                        case 5:
                            chainId = _b.sent();
                            return [4 /*yield*/, this.api.setKey(documentId, chainId, key, this.signature)];
                        case 6:
                            _b.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.SET_KEY);
                            return [2 /*return*/, tokenId];
                    }
                });
            });
        };
        /**
         * Create VWBL NFT which metadata on IPFS.
         *
         * @remarks
         * The following happens: Minting NFT, Uploading encrypted data, Uploading metadata, Setting key to VWBL Network
         * metadata will be uploaded to IPFS.
         * You need to pass `uploadFileCallback` and `uploadMetadataCallBack` if you upload metadata to a storage other than Amazon S3.
         *
         * @param name - The NFT name
         * @param description - The NFT description
         * @param plainFile - The data that only NFT owner can view
         * @param thumbnailImage - The NFT image
         * @param royaltiesPercentage - This percentage of the sale price will be paid to the NFT creator every time the NFT is sold or re-sold
         * @param encryptLogic - Select ether "base64" or "binary". Selection criteria: "base64" -> sutable for small data. "binary" -> sutable for large data.
         * @param mintApiId - The mint method api id of biconomy
         * @param subscriber - Optional: the subscriber for seeing progress
         * @returns
         */
        _this.managedCreateTokenForIPFS = function (name, description, plainFile, thumbnailImage, royaltiesPercentage, encryptLogic, mintApiId, subscriber) {
            if (encryptLogic === void 0) { encryptLogic = "base64"; }
            return __awaiter(_this, void 0, void 0, function () {
                var vwblNetworkUrl, key, plainFileArray, encryptedDataUrls, thumbnailImageUrl, mimeType, metadataUrl, documentId, tokenId, chainId;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.signature) {
                                throw "please sign first";
                            }
                            vwblNetworkUrl = this.opts.vwblNetworkUrl;
                            key = createRandomKey();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.CREATE_KEY);
                            // 2. encrypt data
                            console.log("encrypt data");
                            plainFileArray = [plainFile].flat();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.ENCRYPT_DATA);
                            // 3. upload data
                            console.log("upload data");
                            return [4 /*yield*/, Promise.all(plainFileArray.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                    var encryptedContent, _a, _b;
                                    var _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                if (!(encryptLogic === "base64")) return [3 /*break*/, 2];
                                                _b = encryptString;
                                                return [4 /*yield*/, toBase64FromBlob(file)];
                                            case 1:
                                                _a = _b.apply(void 0, [_d.sent(), key]);
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, encryptFile(file, key)];
                                            case 3:
                                                _a = _d.sent();
                                                _d.label = 4;
                                            case 4:
                                                encryptedContent = _a;
                                                console.log(typeof encryptedContent);
                                                return [4 /*yield*/, ((_c = this.uploadToIpfs) === null || _c === void 0 ? void 0 : _c.uploadEncryptedFile(encryptedContent))];
                                            case 5: return [2 /*return*/, _d.sent()];
                                        }
                                    });
                                }); }))];
                        case 1:
                            encryptedDataUrls = _c.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.UPLOAD_CONTENT);
                            return [4 /*yield*/, ((_a = this.uploadToIpfs) === null || _a === void 0 ? void 0 : _a.uploadThumbnail(thumbnailImage))];
                        case 2:
                            thumbnailImageUrl = _c.sent();
                            // 4. upload metadata
                            console.log("upload meta data");
                            mimeType = getMimeType(plainFileArray[0]);
                            return [4 /*yield*/, ((_b = this.uploadToIpfs) === null || _b === void 0 ? void 0 : _b.uploadMetadata(name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic))];
                        case 3:
                            metadataUrl = _c.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.UPLOAD_METADATA);
                            documentId = utils.hexlify(utils.randomBytes(32));
                            return [4 /*yield*/, this.nft.mintTokenForIPFS(metadataUrl, vwblNetworkUrl, royaltiesPercentage, documentId, mintApiId)];
                        case 4:
                            tokenId = _c.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.MINT_TOKEN);
                            // 6. set key to vwbl-network
                            console.log("set key");
                            return [4 /*yield*/, this.signer.getChainId()];
                        case 5:
                            chainId = _c.sent();
                            return [4 /*yield*/, this.api.setKey(documentId, chainId, key, this.signature)];
                        case 6:
                            _c.sent();
                            subscriber === null || subscriber === void 0 ? void 0 : subscriber.kickStep(StepStatus.SET_KEY);
                            return [2 /*return*/, tokenId];
                    }
                });
            });
        };
        /**
         * Set key to VWBL Network
         *
         * @param tokenId - The ID of NFT
         * @param key - The key generated by {@link VWBL.createKey}
         * @param hasNonce
         * @param autoMigration
         *
         */
        _this.setKey = function (tokenId, key, hasNonce, autoMigration) { return __awaiter(_this, void 0, void 0, function () {
            var documentId, chainId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.getTokenInfo(tokenId)];
                    case 1:
                        documentId = (_a.sent()).documentId;
                        return [4 /*yield*/, this.signer.getChainId()];
                    case 2:
                        chainId = _a.sent();
                        return [4 /*yield*/, this._setKey(documentId, chainId, key, hasNonce, autoMigration)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Mint new NFT
         *
         * @param royaltiesPercentage - This percentage of the sale price will be paid to the NFT creator every time the NFT is sold or re-sold
         * @param mintApiId - The mint method api id of biconomy
         * @returns The ID of minted NFT
         */
        _this.mintToken = function (royaltiesPercentage, mintApiId) { return __awaiter(_this, void 0, void 0, function () {
            var vwblNetworkUrl, documentId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vwblNetworkUrl = this.opts.vwblNetworkUrl;
                        documentId = utils.hexlify(utils.randomBytes(32));
                        return [4 /*yield*/, this.nft.mintToken(vwblNetworkUrl, royaltiesPercentage, documentId, mintApiId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Approves `operator` to transfer the given `tokenId`
         *
         * @param operator - The wallet address
         * @param tokenId - The ID of NFT
         * @param approveApiId - The approve method api id of biconomy
         */
        _this.approve = function (operator, tokenId, approveApiId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.approve(operator, tokenId, approveApiId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the approved address for a `tokenId`
         *
         * @param tokenId - The ID of NFT
         * @return The Wallet address that was approved
         */
        _this.getApproved = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.getApproved(tokenId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Allows `operator` to transfer all tokens that a person who calls this function
         *
         * @param operator - The wallet address
         * @param setApprovalForAllApiId - The setApprovalForAll method api id of biconomy
         */
        _this.setApprovalForAll = function (operator, setApprovalForAllApiId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.setApprovalForAll(operator, setApprovalForAllApiId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Tells whether an `operator` is approved by a given `owner`
         *
         * @param owner - The wallet address of a NFT owner
         * @param operator - The wallet address of an operator
         * @returns
         */
        _this.isApprovedForAll = function (owner, operator) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.isApprovedForAll(owner, operator)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Transfer NFT
         *
         * @param to - The address that NFT will be transfered
         * @param tokenId - The ID of NFT
         * @param safeTransferFromApiId - The safeTransferFrom api id of biconomy
         */
        _this.safeTransfer = function (to, tokenId, safeTransferFromApiId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.safeTransfer(to, tokenId, safeTransferFromApiId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Uplod Metadata
         *
         * @remarks
         * By default, metadata will be uploaded to Amazon S3.
         * You need to pass `uploadMetadataCallBack` if you upload metadata to a storage other than Amazon S3.
         *
         * @param tokenId - The ID of NFT
         * @param name - The NFT name
         * @param description - The NFT description
         * @param thumbnailImageUrl - The URL of the thumbnail image
         * @param encryptedDataUrls - The URL of the encrypted file data
         * @param mimeType - The mime type of encrypted file data
         * @param encryptLogic - Select ether "base64" or "binary". Selection criteria: "base64" -> sutable for small data. "binary" -> sutable for large data.
         * @param uploadMetadataCallBack - Optional: the function for uploading metadata
         */
        _this.uploadMetadata = function (tokenId, name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic, uploadMetadataCallBack) { return __awaiter(_this, void 0, void 0, function () {
            var _a, uploadMetadataType, awsConfig, uploadMetadataFunction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.opts, uploadMetadataType = _a.uploadMetadataType, awsConfig = _a.awsConfig;
                        uploadMetadataFunction = uploadMetadataType === UploadMetadataType.S3 ? uploadMetadata : uploadMetadataCallBack;
                        if (!uploadMetadataFunction) {
                            throw new Error("please specify upload metadata type or give callback");
                        }
                        return [4 /*yield*/, uploadMetadataFunction(tokenId, name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic, awsConfig)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Uplod Metadata to IPFS
         *
         * @remarks
         * Metadata will be uploaded to IPFS.
         *
         * @param tokenId - The ID of NFT
         * @param name - The NFT name
         * @param description - The NFT description
         * @param thumbnailImageUrl - The URL of the thumbnail image
         * @param encryptedDataUrls - The URL of the encrypted file data
         * @param mimeType - The mime type of encrypted file data
         * @param encryptLogic - Select ether "base64" or "binary". Selection criteria: "base64" -> sutable for small data. "binary" -> sutable for large data.
         */
        _this.uploadMetadataToIPFS = function (name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic) { return __awaiter(_this, void 0, void 0, function () {
            var metadataUrl;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.uploadToIpfs) === null || _a === void 0 ? void 0 : _a.uploadMetadata(name, description, thumbnailImageUrl, encryptedDataUrls, mimeType, encryptLogic))];
                    case 1:
                        metadataUrl = _b.sent();
                        return [2 /*return*/, metadataUrl];
                }
            });
        }); };
        /**
         * Get all NFT metadata owned by a person who call this method
         *
         * @returns Array of token metadata
         */
        _this.getOwnTokens = function () { return __awaiter(_this, void 0, void 0, function () {
            var ownTokenIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signature) {
                            throw "please sign first";
                        }
                        return [4 /*yield*/, this.nft.getOwnTokenIds()];
                    case 1:
                        ownTokenIds = _a.sent();
                        return [4 /*yield*/, Promise.all(ownTokenIds.map(this.getMetadata.bind(this)))];
                    case 2: return [2 /*return*/, (_a.sent()).filter(function (extractMetadata) { return extractMetadata !== undefined; })];
                }
            });
        }); };
        /**
         * Get token IDs owned by someone who called this function
         *
         * @returns Array of token IDs
         */
        _this.getOwnTokenIds = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.getOwnTokenIds()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Get NFT metadata from given `tokenId`
         *
         * @remarks
         * Check if a person call this method is a NFT owner, and if so, return a decrypted data.
         *
         * @param tokenId - The ID of NFT
         * @returns Token metadata and an address of NFT owner
         */
        _this.getTokenById = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
            var isOwnerOrMinter, _a, owner, metadata, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.nft.isOwnerOf(tokenId)];
                    case 1:
                        _a = (_c.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.nft.isMinterOf(tokenId)];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        isOwnerOrMinter = _a;
                        return [4 /*yield*/, this.nft.getOwner(tokenId)];
                    case 4:
                        owner = _c.sent();
                        if (!isOwnerOrMinter) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.extractMetadata(tokenId)];
                    case 5:
                        _b = _c.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.getMetadata(tokenId)];
                    case 7:
                        _b = _c.sent();
                        _c.label = 8;
                    case 8:
                        metadata = _b;
                        if (!metadata) {
                            throw new Error("metadata not found");
                        }
                        return [2 /*return*/, __assign(__assign({}, metadata), { owner: owner })];
                }
            });
        }); };
        /**
         * Get token ids by minter address
         * @param address - minter address
         * @returns Token ids
         */
        _this.getTokenByMinter = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nft.getTokenByMinter(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Get NFT metadata from given `tokenId`
         *
         * @param tokenId - The ID of NFT
         * @returns Token metadata
         */
        _this.getMetadata = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
            var metadataUrl, metadata;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.nft.getMetadataUrl(tokenId)];
                    case 1:
                        metadataUrl = _b.sent();
                        return [4 /*yield*/, axios.get(metadataUrl).catch(function () { return undefined; })];
                    case 2:
                        metadata = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.data;
                        // delete token if metadata is not found
                        if (!metadata) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                id: tokenId,
                                name: metadata.name,
                                description: metadata.description,
                                image: metadata.image,
                                mimeType: metadata.mime_type,
                                encryptLogic: metadata.encrypt_logic,
                            }];
                }
            });
        }); };
        /**
         * Get NFT metadata from given `tokenId`
         *
         * @remarks
         * This method should be called by NFT owner.
         *
         * @param tokenId The ID of NFT
         * @returns Token metadata
         */
        _this.extractMetadata = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
            var metadataUrl, metadata, documentId, chainId, decryptKey, encryptedDataUrls, isRunningOnBrowser, encryptLogic, ownDataArray, ownFiles, ownDataBase64, fileName;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signature) {
                            throw "please sign first";
                        }
                        return [4 /*yield*/, this.nft.getMetadataUrl(tokenId)];
                    case 1:
                        metadataUrl = _c.sent();
                        return [4 /*yield*/, axios.get(metadataUrl).catch(function () { return undefined; })];
                    case 2:
                        metadata = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.data;
                        // delete token if metadata is not found
                        if (!metadata) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this.nft.getTokenInfo(tokenId)];
                    case 3:
                        documentId = (_c.sent()).documentId;
                        return [4 /*yield*/, this.signer.getChainId()];
                    case 4:
                        chainId = _c.sent();
                        return [4 /*yield*/, this.api.getKey(documentId, chainId, this.signature)];
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
        _this.opts = props;
        var bcProvider = props.bcProvider, contractAddress = props.contractAddress, biconomyConfig = props.biconomyConfig;
        var walletProvider = new ethers.providers.Web3Provider(bcProvider);
        _this.signer = walletProvider.getSigner();
        _this.nft = new VWBLNFTMetaTx(biconomyConfig.apiKey, walletProvider, contractAddress, biconomyConfig.forwarderAddress);
        return _this;
    }
    return VWBLMetaTx;
}(VWBLBase));
export { VWBLMetaTx };
