import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StorageKey } from '../assignment-modules/constants/storage-key.constant';
import { AppConfig } from '../assignment-modules/models/app-config';
import { AppConfigService } from './config.service';
import { ITransactionInterface } from './interfaces/transaction.interface';
import { Transaction } from './models/response/transaction.model';

@Injectable()
export class TransactionService implements ITransactionInterface {
  //#region Properties

  // Transactions source subject handling
  private transactionSubject = new BehaviorSubject<Transaction[]>([]);

  public transactionHolderObservable = this.transactionSubject.asObservable();
  //#endregion

  //#region Constructor
  public constructor(
    protected http: HttpClient,
    protected appConfigService: AppConfigService,
    protected storageMap: StorageMap
  ) {}

  //#endregion

  //#region Methods

  public get getTransactionHolderObservable(): Observable<Transaction[]> {
    return this.transactionHolderObservable;
  }

  // Update transaction list
  public updateTransactionList(transactions: Transaction[]): void {
    this.transactionSubject.next(transactions);
  }

  // Get transactions list
  public getTransactionsAsync(): Observable<Transaction[]> {
    return this.appConfigService.loadConfigurationAsync().pipe(
      mergeMap((appConfig: AppConfig) => {
        return this.http.get(`${appConfig.baseUrl}transactions.json`);
      }),
      map((response: any) => response.data)
    );
  }

  // Store transaction list
  public storeTransactionsAsync(
    transactions: Transaction[]
  ): Observable<Transaction[]> {
    return this.storageMap.set(StorageKey.transactionsList, transactions);
  }

  // Get transaction list from cache
  public loadTransactionsCacheAsync(): any {
    return this.storageMap.get(StorageKey.transactionsList);
  }
  //#endregion
}
