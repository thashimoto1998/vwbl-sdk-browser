import * as crypto from "crypto-js";
import * as Stream from "stream";
import * as uuid from "uuid";

import { toArrayBuffer } from "./fileHelper";

export const createRandomKey = uuid.v4;
export const encryptString = (message: string, key: string) => {
  return crypto.AES.encrypt(message, key).toString();
};

export const decryptString = (cipherText: string, key: string) => {
  return crypto.AES.decrypt(cipherText, key).toString(crypto.enc.Utf8);
};

export const encryptFileOnBrowser = async (file: File, key: string): Promise<ArrayBuffer> => {
  const crypto = window.crypto;
  const subtle = crypto.subtle;
  const aes = {
    name: "AES-CBC",
    iv: new Uint8Array(16),
  };
  const aesAlgorithmKeyGen = {
    name: "AES-CBC",
    length: 256,
  };
  // UUID v4から-をとるとちょうど32文字 = 256bite
  const keyData = new TextEncoder().encode(key.replace(/-/g, ""));
  const aesKey = await subtle.importKey("raw", keyData, aesAlgorithmKeyGen, true, ["encrypt"]);
  return await subtle.encrypt(aes, aesKey, await file.arrayBuffer());
};

export const decryptFileOnBrowser = async (encryptedFile: ArrayBuffer, key: string): Promise<ArrayBuffer> => {
  const crypto = window.crypto;
  const subtle = crypto.subtle;
  const aes = {
    name: "AES-CBC",
    iv: new Uint8Array(16),
  };
  const aesAlgorithmKeyGen = {
    name: "AES-CBC",
    length: 256,
  };
  const keyData = new TextEncoder().encode(key.replace(/-/g, ""));
  const aesKey = await subtle.importKey("raw", keyData, aesAlgorithmKeyGen, true, ["decrypt"]);
  return await subtle.decrypt(aes, aesKey, encryptedFile);
};

export const encryptFile = encryptFileOnBrowser;
export const decryptFile = decryptFileOnBrowser;