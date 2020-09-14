import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongDetailComponent } from './song-detail/song-detail.component';

import { SongsComponent } from './songs.component'

const routes: Routes = [
  {
    path: '',
    component: SongsComponent
  },
  {
    path: 'detail/:songName',
    component: SongDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
