import {NgModule} from '@angular/core';
import {ItemControlComponent} from './item-control.component';
import {CommonModule} from '@angular/common';
import {ItemControlPartDirective} from './item-control-part.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
    ],
  declarations: [
    ItemControlComponent,
    ItemControlPartDirective
  ],
  exports: [
    ItemControlComponent,
    ItemControlPartDirective
  ]
})
export class ItemControlModule {
}
