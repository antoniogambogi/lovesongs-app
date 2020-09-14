import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './songs.component';
import { SongCardComponent } from './song-card/song-card.component';


@NgModule({
  declarations: [
    SongsComponent,
    SongCardComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class SongsModule { }
