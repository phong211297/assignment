import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchControllerComponent } from './search-controller.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateSharedLazyModule } from '../../../translate-shared-lazy/translate-shared-lazy.module';

@NgModule({
  declarations: [SearchControllerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    TranslateSharedLazyModule,
  ],
  exports: [SearchControllerComponent],
})
export class SearchControllerModule {}
