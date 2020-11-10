import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortControllerComponent } from './sort-controller.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [SortControllerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [SortControllerComponent]
})
export class SortControllerModule { }
