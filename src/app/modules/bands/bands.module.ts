import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandsRoutingModule } from './bands-routing.module';
import { BandsComponent } from './bands.component';


@NgModule({
  declarations: [BandsComponent],
  imports: [
    CommonModule,
    BandsRoutingModule
  ]
})
export class BandsModule { }
