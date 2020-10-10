import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 

import { BandsRoutingModule } from './bands-routing.module';
import { BandsComponent } from './bands.component';
import { ComponentsModule } from './../../components/components.module';
import { BandCardComponent } from './band-card/band-card.component';
import { BandDetailComponent } from './band-detail/band-detail.component'
import { SongsModule } from './../songs/songs.module';
import { NewBandComponent } from './new-band/new-band.component'


@NgModule({
  declarations: [
    BandsComponent, 
    BandCardComponent, 
    BandDetailComponent, 
    NewBandComponent
  ],
  imports: [
    CommonModule,
    BandsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    SongsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BandsModule { }
