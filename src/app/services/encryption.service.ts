import { Injectable } from "@angular/core";
import { encrypt } from "@metamask/eth-sig-util";

@Injectable({
  providedIn: "root",
})
export class EncryptionService {
  constructor() {}
  encryptData(publicKey: Buffer, data: Buffer) {
    // Returned object contains 4 properties: version, ephemPublicKey, nonce, ciphertext
    // Each contains data encoded using base64, version is always the same string
    const enc = encrypt({
      publicKey: publicKey.toString("base64"),
      data: ascii85.encode(data).toString(),
      version: "x25519-xsalsa20-poly1305",
    });

    // We want to store the data in smart contract, therefore we concatenate them
    // into single Buffer
    const buf = Buffer.concat([
      Buffer.from(enc.ephemPublicKey, "base64"),
      Buffer.from(enc.nonce, "base64"),
      Buffer.from(enc.ciphertext, "base64"),
    ]);

    // In smart contract we are using `bytes[112]` variable (fixed size byte array)
    // you might need to use `bytes` type for dynamic sized array
    // We are also using ethers.js which requires type `number[]` when passing data
    // for argument of type `bytes` to the smart contract function
    // Next line just converts the buffer to `number[]` required by contract function
    // THIS LINE IS USED IN OUR ORIGINAL CODE:
    // return buf.toJSON().data;

    // Return just the Buffer to make the function directly compatible with decryptData function
    return buf;
  }
}
const ascii85 = require("ascii85");
