import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarModule } from './modules/navigation-bar/navigation-bar.module';
import { PrimaryLayoutModule } from './modules/primary-layout/primary-layout.module';
import { HomeLayoutModule } from './modules/home-layout/home-layout.module';
import { BoxLayoutModule } from './modules/box-layout/box-layout.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationBarModule,
    PrimaryLayoutModule,
    HomeLayoutModule,
    BoxLayoutModule,
  ],
  exports: [
    NavigationBarModule,
    PrimaryLayoutModule,
    HomeLayoutModule,
    BoxLayoutModule,
  ],
})
export class AssignmentsCoreUiModule {}
