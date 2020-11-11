import { mergeMap } from 'rxjs/operators';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Transaction } from 'src/app/assignment-api/models/response/transaction.model';
import { TransactionService } from 'src/app/assignment-api/transaction.service';
import { of, Subscription } from 'rxjs';
import { TRANSACTION_SERVICE_PROVIDER } from 'src/app/assignment-api/injector/shared-injector.constant';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit, OnDestroy {
  //#region Properties

  @ViewChild('confirmDialog')
  public confirmDialog: TemplateRef<any>;

  // Transfer form group
  public transferForm: FormGroup;

  // User account bank
  public userBudget = 5824.76;

  // From account controller
  public fromAccountController = new FormControl(
    { value: `Free Checking(4692) - $${this.userBudget}`, disabled: true },
    [Validators.required]
  );

  // To account controller
  public toAccountController = new FormControl(
    'Georgia Power Electric Company',
    [Validators.required]
  );

  // Amount controller
  public amountController = new FormControl('0.00', [
    Validators.required,
    Validators.min(0),
    Validators.max(this.userBudget - 500),
  ]);

  // Create subscription watch list
  private _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor(
    public dialog: MatDialog,
    @Inject(TRANSACTION_SERVICE_PROVIDER)
    protected transactionService: TransactionService,
    public changeDetector: ChangeDetectorRef
  ) {
    // Bind subscription
    this._subscription = new Subscription();

    this.transferForm = new FormGroup({
      fromAccountController: this.fromAccountController,
      toAccountController: this.toAccountController,
      amamountControllerount: this.amountController,
    });
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {}

  // Confirm transfer
  public confirmTransfer(): void {
    const newTransferRequestModel = new Transaction();
    newTransferRequestModel.categoryCode = '';
    newTransferRequestModel.dates = { valueDate: new Date().getTime() };
    newTransferRequestModel.merchant = {
      accountNumber: '',
      name: this.toAccountController.value,
    };
    newTransferRequestModel.transaction = {
      amountCurrency: {
        amount: this.amountController.value,
        currencyCode: 'EUR',
      },
      type: 'Transaction',
      creditDebitIndicator: 'DBIT',
    };

    const loadTransactionSubscription = this.transactionService
      .loadTransactionsCacheAsync()
      .pipe(
        mergeMap((transactions: Transaction[]) => {
          // Decrese the amount of budget
          this.userBudget = Number(
            (
              this.userBudget -
              newTransferRequestModel.transaction.amountCurrency.amount
            ).toFixed(2)
          );

          this.transferForm.setValue({
            fromAccountController: `Free Checking(4692) - $${this.userBudget}`,
            toAccountController: 'Georgia Power Electric Company',
            amamountControllerount: '0.00',
          });

          this.amountController.setValidators(
            Validators.max(this.userBudget - 500)
          );

          transactions = [newTransferRequestModel, ...transactions];
          this.transactionService.updateTransactionList(transactions);
          return this.transactionService.storeTransactionsAsync(transactions);
        })
      )
      .subscribe(() => this.dialog.closeAll());

    this._subscription.add(loadTransactionSubscription);
  }

  //  Get error message
  public getAmountErrorMessage(): string {
    if (!this.amountController.invalid) {
      return '';
    }

    if (this.amountController.errors && this.amountController.errors.required) {
      return 'This field is required !';
    }

    if (this.amountController.errors && this.amountController.errors.max) {
      return 'Amount transfer is higher than your current budget !';
    }

    if (this.amountController.errors && this.amountController.errors.min) {
      return 'Invalid amount transfer !';
    }
  }

  // On form submit
  public onSubmit(): void {
    if (!this.transferForm || !this.transferForm.valid) {
      return;
    }

    this.dialog.open(this.confirmDialog);
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  //#endregion
}
