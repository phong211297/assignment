import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchControllerModule } from './search-controller/search-controller.module';
import { TransferFormModule } from './transfer-form/transfer-form.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SearchControllerModule, TransferFormModule],
  exports: [SearchControllerModule, TransferFormModule],
})
export class SharingModule {}
