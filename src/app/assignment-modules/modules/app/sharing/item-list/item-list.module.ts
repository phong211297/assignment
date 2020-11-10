import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsCoreUiModule } from 'src/app/assignment-core-ui/assignments-core-ui.module';
import { ItemListComponent } from './item-list.component';

@NgModule({
  declarations: [ItemListComponent],
  imports: [
    CommonModule,
    AssignmentsCoreUiModule
  ],
  exports: [ItemListComponent]
})
export class ItemListModule { }
