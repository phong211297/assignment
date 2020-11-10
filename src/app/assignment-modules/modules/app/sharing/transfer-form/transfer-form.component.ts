import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  //#region Properties

  // Transfer form group
  public transferForm: FormGroup;

  // From account controller
  public fromAccountController = new FormControl('Free Checking(4692) - $5824.76', [Validators.required]);

  // To account controller
  public toAccountController = new FormControl('Georgia Power Electric Company', [Validators.required]);

  // Amount controller
  public amountController = new FormControl('0.00', [Validators.required]);

  //#endregion

  //#region Constructor

  public constructor() {
    this.transferForm = new FormGroup({
      fromAccountController: this.fromAccountController,
      toAccountController: this.toAccountController,
      amamountControllerount: this.amountController,
    });
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void { }

  // On form submit
  public onSubmit(): void {
    console.log(this.transferForm.value);
  }
  //#endregion
}
