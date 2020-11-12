import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortControllerComponent } from './sort-controller.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateSharedLazyModule } from '../../../translate-shared-lazy/translate-shared-lazy.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SortControllerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    TranslateSharedLazyModule,
    FormsModule,
  ],
  exports: [SortControllerComponent],
})
export class SortControllerModule {}
