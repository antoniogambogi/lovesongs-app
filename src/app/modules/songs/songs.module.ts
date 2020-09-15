import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './songs.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { ComponentsModule } from './../../components/components.module'


@NgModule({
  declarations: [
    SongsComponent,
    SongCardComponent,
    SongDetailComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule
  ]
})
export class SongsModule { }
