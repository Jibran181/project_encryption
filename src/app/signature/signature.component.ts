import { Component } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import Web3 from "web3";
import { Buffer } from "buffer";

@Component({
  selector: "app-signature",
  templateUrl: "./signature.component.html",
  styleUrls: ["./signature.component.css"],
})
export class SignatureComponent {
  // Account is account address provided as string
  // App must have access to the specified account

  account: any;
  keyB64: any;
  constructor() {
    this.init();
  }

  async init() {
    // debugger;
    this.account = "0xd2b3bB372d264ae9Fc7f1056a7f3BA1CB0A4153e"; // will get this from frontend

    // Key is returned as base64
    this.keyB64 = (await window.ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [this.account],
    })) as string;

    // console.log("dgfhjkj", this.keyB64);
    console.log(this.keyB64);
    debugger;
    //const decoder = new TextDecoder("utf-8");
    // const decodedString = decoder.decode(this.keyB64);
    // console.log(decodedString);
    const decodedBuffer = Buffer.from(this.keyB64, "base64");
    console.log(decodedBuffer);
  }
}
declare let window: any;
