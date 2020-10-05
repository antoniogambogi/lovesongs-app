import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BandsComponent } from './bands.component'

const routes: Routes = [
  {
    path: '',
    component: BandsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandsRoutingModule { }
