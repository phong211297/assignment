import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryLayoutComponent } from 'src/app/assignment-core-ui/modules/primary-layout/primary-layout.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
