import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule} from '@angular/material/dialog'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
 
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
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SongsModule { }
