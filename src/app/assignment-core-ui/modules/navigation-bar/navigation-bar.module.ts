import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationBarLeftDirective } from './navigation-bar-left.directive';
import { NavigationBarMiddleDirective } from './navigation-bar-middle.directive';
import { NavigationBarRightDirective } from './navigation-bar-right.directive';



@NgModule({
  declarations: [NavigationBarComponent, NavigationBarLeftDirective, NavigationBarMiddleDirective, NavigationBarRightDirective],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [NavigationBarComponent]
})
export class NavigationBarModule { }
