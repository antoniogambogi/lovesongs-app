import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { SongsService } from './../../../core/services/songs.service'
import { Musica } from './../../../core/models/musica.model'
import { MatDialog } from '@angular/material/dialog';
import { UpdateSongComponent } from './../update-song/update-song.component'
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component'
import { MyToastrService } from 'src/app/core/services/toastr.service';


@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Musica: Musica
  hasError: boolean = false
  songName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private songsService: SongsService,
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.songName = this.activatedRoute.snapshot.params['songName']
    this.findSongByName(this.songName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe
  }

  findSongByName(songName: String): void {
    this.httpRequest = this.songsService.findSongByName(songName).subscribe(response => {
      this.Musica = response.body['data']

    }, err => {
      this.hasError = true
    })
  }

  openUpdateSongModal(): void {
    const dialogRef = this.dialog.open(UpdateSongComponent, {
      disableClose: true,
      width: '650px',
      height: '600px',
      data: this.Musica
    })

    dialogRef.afterClosed().subscribe(updatedSong => {
      if (updatedSong) {
        this.Musica = undefined
        this.findSongByName(this.songName)
      }
    })

  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '160px',
      data: `Deseja apagar a música ${this.Musica['nome']}?`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteSong(this.Musica['_id'])
      }
    })
  }

  deleteSong(songId: String): void {
    this.httpRequest = this.songsService.deleteSongById(songId).subscribe(response => {
      this.toastr.showToastrSuccess(`A música ${this.Musica['nome']} foi apagada com sucesso`)
      this.route.navigate(['songs'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }
}
