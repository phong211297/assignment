import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransferFormComponent } from './transfer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateSharedLazyModule } from '../../../translate-shared-lazy/translate-shared-lazy.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TranslateSharedLazyModule,
  ],
  declarations: [TransferFormComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransferFormComponent,
    TranslateModule,
  ],
})
export class TransferFormModule {}
