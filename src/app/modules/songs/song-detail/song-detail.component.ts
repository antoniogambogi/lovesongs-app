import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Subscription} from 'rxjs'
import { SongsService } from './../../../core/services/songs.service'
import { Musica } from './../../../core/models/musica.model'

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Musica: Musica
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private songsService: SongsService
  ) { }

  ngOnInit(): void {
    const songName = this.activatedRoute.snapshot.params['songName']
    this.findSongByName(songName)
  }

  ngOnDestroy(): void{
    this.httpRequest.unsubscribe
  }

  findSongByName(songName: String): void{
    this.httpRequest = this.songsService.findSongByName(songName).subscribe(response => {
      this.Musica = response.body['data']

    }, err =>{
      this.hasError = true
    })
  }
}
