import { Component, Input, OnInit } from '@angular/core';
import { Banda } from 'src/app/core/models/banda.model';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.css']
})
export class BandCardComponent implements OnInit {

  @Input() Band: Banda

  constructor() { }

  ngOnInit(): void {
  }

  countSongsOnBand(nSongs: Number): String{
    return nSongs > 1 ? `${nSongs} musicas disponíveis`: `${nSongs} musica disponível`
  }

}
