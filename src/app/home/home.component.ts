import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { enviroment } from "src/app/enviroments/enviroment";
import { ethers } from "ethers";
import { StorageService } from "../services/storage.service";
import { AuthGaurdService } from "../services/authGaurd.service";
import { Router } from "@angular/router";

//   this.router.navigate([""]);

declare let window: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  form: FormGroup;
  signer: any;
  signature: any;
  contract: any;
  constructor(
    private fb: FormBuilder,
    private sS: StorageService,
    private logout: AuthGaurdService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rAddress: ["", Validators.required],
      key: ["", [Validators.required]],
    });
    this.getSigner();
  }

  domain = {
    name: enviroment.SIGNING_DOMAIN_NAME,
    version: enviroment.SIGNING_DOMAIN_VERSION,
    verifyingContract: enviroment.CONTRACT_ADDRESS,
    chainId: enviroment.CHAIN_ID,
  };

  async getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    this.signer = provider.getSigner();
    return this.signer;
  }

  onSubmit() {
    console.log(this.form.value);
    const responses = this.SignFunc(
      this.signer,
      this.form.value.rAddress,
      this.form.value.key
    );
    this.sS.setItemWithoutEncryption(
      this.form.value.rAddress,
      this.form.value.key
    );
    console.log(responses);
  }

  async SignFunc(signer: any, rAddress: any, key: any) {
    console.log(rAddress);
    console.log(key);
    const voucher = {
      rAddress,
      key,
    };
    const types = {
      Offer: [
        { name: "rAddress", type: "string" },
        { name: "key", type: "string" },
      ],
    };
    try {
      this.signature = await signer._signTypedData(this.domain, types, voucher);
    } catch (e) {
      console.log(e);
    }

    console.log("signFunc", this.signature);
    return {
      ...voucher,
      signature: this.signature,
    };
  }
  Logout() {
    this.logout.logout();
  }
  recieve() {
    this.router.navigate(["reciever"]);
  }
}
