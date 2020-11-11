import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateSharedLazyModule } from 'src/app/assignment-modules/modules/translate-shared-lazy/translate-shared-lazy.module';

@NgModule({
  declarations: [PrimaryLayoutComponent],
  imports: [
    CommonModule,
    NavigationBarModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    TranslateSharedLazyModule,
  ],
  exports: [PrimaryLayoutComponent, TranslateModule],
})
export class PrimaryLayoutModule {}
