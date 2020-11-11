import { InjectionToken } from '@angular/core';
import { ITransactionInterface } from '../interfaces/transaction.interface';

export const TRANSACTION_SERVICE_PROVIDER = new InjectionToken<
  ITransactionInterface
>('Service provider for handling transaction service');
