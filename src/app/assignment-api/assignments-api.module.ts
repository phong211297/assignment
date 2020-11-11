import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSACTION_SERVICE_PROVIDER } from './injector/shared-injector.constant';
import { TransactionService } from './transaction.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AssignmentsApiModule {
  static forRoot(): ModuleWithProviders<AssignmentsApiModule> {
    return {
      ngModule: AssignmentsApiModule,
      providers: [
        { provide: TRANSACTION_SERVICE_PROVIDER, useClass: TransactionService },
      ],
    };
  }
}
