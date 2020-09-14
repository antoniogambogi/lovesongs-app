import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './songs.component';


@NgModule({
  declarations: [SongsComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MatCardModule
  ]
})
export class SongsModule { }
