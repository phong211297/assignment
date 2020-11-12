import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TRANSACTION_SERVICE_PROVIDER } from 'src/app/assignment-api/injector/shared-injector.constant';
import { Transaction } from 'src/app/assignment-api/models/response/transaction.model';
import { TransactionService } from 'src/app/assignment-api/transaction.service';
import { SortKeywordSection } from '../../constants/sort-keyword-section.constant';
import { SORT_KEYWORD_SECTIONS } from '../../constants/sort-keyword.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //#region Properties

  // List transactions
  public transactions: Transaction[];

  // Create subscription watch list
  private _subscription: Subscription;

  // Update transaction subject
  private _updateTransactionsSubject: Subject<Transaction[]>;

  // Transaction list origin
  public transactionOrigin: Transaction[];

  //#endregion

  //#region Constructor
  public constructor(
    @Inject(TRANSACTION_SERVICE_PROVIDER)
    protected transactionService: TransactionService
  ) {
    // Bind subscription
    this._subscription = new Subscription();

    this._updateTransactionsSubject = new Subject<Transaction[]>();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    // Load transaction update
    const loadTransactionUpdateSubscription = this.transactionService.getTransactionHolderObservable.subscribe(
      (transaction: Transaction[]) => (this.transactions = transaction)
    );

    this._subscription.add(loadTransactionUpdateSubscription);

    // Update transaction based on api or cache
    const getTransactionSubscription = this._updateTransactionsSubject
      .pipe(
        mergeMap(() => {
          return this.transactionService.loadTransactionsCacheAsync();
        }),
        mergeMap((transactions: Transaction[]) => {
          if (!transactions) {
            return this.transactionService.getTransactionsAsync().pipe(
              mergeMap((reponseTransactionList: Transaction[]) => {
                this.transactions = reponseTransactionList;
                this.transactionOrigin = reponseTransactionList;
                return this.transactionService.storeTransactionsAsync(
                  reponseTransactionList
                );
              })
            );
          }

          return of(transactions);
        })
      )
      .subscribe((transactions: Transaction[]) => {
        if (!transactions) {
          return;
        }
        this.transactions = transactions;
        this.transactionOrigin = transactions;
      });

    this._subscription.add(getTransactionSubscription);

    this._updateTransactionsSubject.next();
  }

  // Filter transactions list
  public searchTransactionsList(keyword: string): void {
    if (!keyword || keyword === '') {
      this._updateTransactionsSubject.next();
      return;
    }

    keyword = keyword.toLowerCase();

    this.transactions = this.transactionOrigin.filter(
      (transaction: Transaction) => {
        if (
          !transaction ||
          !transaction.merchant ||
          !transaction.merchant.name
        ) {
          return false;
        }

        return transaction.merchant.name.toLowerCase().search(keyword) !== -1;
      }
    );
  }

  // Sort transactions list
  public sortTransactionList(keyword: SORT_KEYWORD_SECTIONS): void {
    if (!keyword) {
      this._updateTransactionsSubject.next();
      return;
    }

    switch (keyword) {
      case SortKeywordSection.newAmount: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.transaction ||
              !transactionA.transaction.amountCurrency ||
              !transactionA.transaction.amountCurrency.amount ||
              !transactionB ||
              !transactionB.transaction ||
              !transactionB.transaction.amountCurrency ||
              !transactionB.transaction.amountCurrency.amount
            ) {
              throw new Error('Invalid transaction data while sorting');
            }

            return (
              transactionB.transaction.amountCurrency.amount -
              transactionA.transaction.amountCurrency.amount
            );
          }
        );

        return;
      }

      case SortKeywordSection.oldAmount: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.transaction ||
              !transactionA.transaction.amountCurrency ||
              !transactionA.transaction.amountCurrency.amount ||
              !transactionB ||
              !transactionB.transaction ||
              !transactionB.transaction.amountCurrency ||
              !transactionB.transaction.amountCurrency.amount
            ) {
              throw new Error('Invalid transaction data while sorting');
            }

            return (
              transactionA.transaction.amountCurrency.amount -
              transactionB.transaction.amountCurrency.amount
            );
          }
        );

        return;
      }

      case SortKeywordSection.oldBeneficiary: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.merchant ||
              !transactionA.merchant.name ||
              !transactionB ||
              !transactionB.merchant ||
              !transactionB.merchant.name
            ) {
              throw new Error('Invalid transaction data while sorting');
            }

            const nameA = transactionA.merchant.name.toLowerCase();
            const nameB = transactionB.merchant.name.toLowerCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameB > nameA) {
              return 1;
            }
            return 0;
          }
        );

        return;
      }

      case SortKeywordSection.newBeneficiary: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.merchant ||
              !transactionA.merchant.name ||
              !transactionB ||
              !transactionB.merchant ||
              !transactionB.merchant.name
            ) {
              throw new Error('Invalid transaction data while sorting');
            }

            const nameA = transactionA.merchant.name.toLowerCase();
            const nameB = transactionB.merchant.name.toLowerCase();

            if (nameB < nameA) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        );

        return;
      }

      case SortKeywordSection.oldDate: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.dates ||
              !transactionA.dates.valueDate ||
              !transactionB ||
              !transactionB.dates ||
              !transactionB.dates.valueDate
            ) {
              throw new Error('Invalid transaction data while sorting');
            }
            const dateA = new Date(transactionA.dates.valueDate);
            const dateB = new Date(transactionB.dates.valueDate);

            return dateA.getTime() - dateB.getTime();
          }
        );

        return;
      }

      case SortKeywordSection.newDate: {
        this.transactions = this.transactions.sort(
          (transactionA: Transaction, transactionB: Transaction) => {
            if (
              !transactionA ||
              !transactionA.dates ||
              !transactionA.dates.valueDate ||
              !transactionB ||
              !transactionB.dates ||
              !transactionB.dates.valueDate
            ) {
              throw new Error('Invalid transaction data while sorting');
            }

            const dateA = new Date(transactionA.dates.valueDate);
            const dateB = new Date(transactionB.dates.valueDate);

            return dateB.getTime() - dateA.getTime();
          }
        );

        return;
      }
    }
  }

  public updateTransactionsList(): void {
    this._updateTransactionsSubject.next();
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
