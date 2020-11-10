import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchControllerModule } from './search-controller/search-controller.module';
import { TransferFormModule } from './transfer-form/transfer-form.module';
import { SortControllerModule } from './sort-controller/sort-controller.module';
import { ItemListModule } from './item-list/item-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SearchControllerModule, TransferFormModule, SortControllerModule, ItemListModule],
  exports: [SearchControllerModule, TransferFormModule, SortControllerModule, ItemListModule],
})
export class SharingModule { }
