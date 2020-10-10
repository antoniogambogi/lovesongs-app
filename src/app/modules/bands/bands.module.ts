import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BandsRoutingModule } from './bands-routing.module';
import { BandsComponent } from './bands.component';
import { ComponentsModule } from './../../components/components.module';
import { BandCardComponent } from './band-card/band-card.component';
import { BandDetailComponent } from './band-detail/band-detail.component'
import { SongsModule } from './../songs/songs.module'


@NgModule({
  declarations: [BandsComponent, BandCardComponent, BandDetailComponent],
  imports: [
    CommonModule,
    BandsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    SongsModule
  ]
})
export class BandsModule { }
