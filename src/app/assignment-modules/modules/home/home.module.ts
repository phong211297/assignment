import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AssignmentsCoreUiModule } from 'src/app/assignment-core-ui/assignments-core-ui.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { SharingModule } from '../app/sharing/sharing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateSharedLazyModule } from '../translate-shared-lazy/translate-shared-lazy.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AssignmentsCoreUiModule,
    MatIconModule,
    SharingModule,
    TranslateSharedLazyModule,
  ],
})
export class HomeModule {}
