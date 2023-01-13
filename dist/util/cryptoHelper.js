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
import * as crypto from "crypto-js";
import * as uuid from "uuid";
export var createRandomKey = uuid.v4;
export var encryptString = function (message, key) {
    return crypto.AES.encrypt(message, key).toString();
};
export var decryptString = function (cipherText, key) {
    return crypto.AES.decrypt(cipherText, key).toString(crypto.enc.Utf8);
};
export var encryptFileOnBrowser = function (file, key) { return __awaiter(void 0, void 0, void 0, function () {
    var crypto, subtle, aes, aesAlgorithmKeyGen, keyData, aesKey, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                crypto = window.crypto;
                subtle = crypto.subtle;
                aes = {
                    name: "AES-CBC",
                    iv: new Uint8Array(16),
                };
                aesAlgorithmKeyGen = {
                    name: "AES-CBC",
                    length: 256,
                };
                keyData = new TextEncoder().encode(key.replace(/-/g, ""));
                return [4 /*yield*/, subtle.importKey("raw", keyData, aesAlgorithmKeyGen, true, ["encrypt"])];
            case 1:
                aesKey = _d.sent();
                _b = (_a = subtle).encrypt;
                _c = [aes, aesKey];
                return [4 /*yield*/, file.arrayBuffer()];
            case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
            case 3: return [2 /*return*/, _d.sent()];
        }
    });
}); };
export var decryptFileOnBrowser = function (encryptedFile, key) { return __awaiter(void 0, void 0, void 0, function () {
    var crypto, subtle, aes, aesAlgorithmKeyGen, keyData, aesKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                crypto = window.crypto;
                subtle = crypto.subtle;
                aes = {
                    name: "AES-CBC",
                    iv: new Uint8Array(16),
                };
                aesAlgorithmKeyGen = {
                    name: "AES-CBC",
                    length: 256,
                };
                keyData = new TextEncoder().encode(key.replace(/-/g, ""));
                return [4 /*yield*/, subtle.importKey("raw", keyData, aesAlgorithmKeyGen, true, ["decrypt"])];
            case 1:
                aesKey = _a.sent();
                return [4 /*yield*/, subtle.decrypt(aes, aesKey, encryptedFile)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var encryptFile = encryptFileOnBrowser;
export var decryptFile = decryptFileOnBrowser;
