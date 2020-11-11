import { Observable } from 'rxjs';
import { Transaction } from '../models/response/transaction.model';

export interface ITransactionInterface {
  // Update transaction list
  updateTransactionList(transactions: Transaction[]): void;

  // Get transactions list
  getTransactionsAsync(): Observable<Transaction[]>;

  // Store transaction list
  storeTransactionsAsync(
    transactions: Transaction[]
  ): Observable<Transaction[]>;

  // Get transaction list from cache
  loadTransactionsCacheAsync(): any;
}
