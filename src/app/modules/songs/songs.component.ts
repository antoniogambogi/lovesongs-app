import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { Musica } from './../../core/models/musica.model'
import { SongsService } from './../../core/services/songs.service'
import { MatDialog } from '@angular/material/dialog'
import { NewSongComponent } from './new-song/new-song.component'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Musicas: Musica[]

  constructor(
    private songsService: SongsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllSongs()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllSongs(): void {
    this.httpRequest = this.songsService.findAllSongs().subscribe(response => {
      this.Musicas = response.body['data']
    }, err => {
      console.log(err)
    })
  }

  openNewSongModal(): void {
    const dialogRef = this.dialog.open(NewSongComponent, {
      width: '650px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(NewSongadded => {
      if(NewSongadded){
        this.Musicas = undefined
        this.findAllSongs()
      }
    })
  }

}
