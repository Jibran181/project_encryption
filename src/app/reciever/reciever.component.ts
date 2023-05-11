import { Component } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-reciever",
  templateUrl: "./reciever.component.html",
  styleUrls: ["./reciever.component.css"],
})
export class RecieverComponent {
  check: boolean = false;
  message: any;
  form: FormGroup;

  constructor(private sS: StorageService, private fb: FormBuilder) {
    this.form = this.fb.group({
      rAddress: ["", Validators.required],
    });
  }
  onSubmit() {
    this.check = true;
    this.message = this.sS.getItemWithoutEncryption(this.form.value.rAddress);
  }
}
