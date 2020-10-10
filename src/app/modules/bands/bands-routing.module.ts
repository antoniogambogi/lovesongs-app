import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandDetailComponent } from './band-detail/band-detail.component';

import { BandsComponent } from './bands.component';

const routes: Routes = [
  {
    path: '',
    component: BandsComponent
  },
  {
  path: 'detail/:bandName',
  component: BandDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandsRoutingModule { }
