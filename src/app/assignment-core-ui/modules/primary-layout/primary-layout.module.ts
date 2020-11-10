import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PrimaryLayoutComponent],
  imports: [CommonModule, NavigationBarModule, RouterModule],
  exports: [PrimaryLayoutComponent],
})
export class PrimaryLayoutModule {}
