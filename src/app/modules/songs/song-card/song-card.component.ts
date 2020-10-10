import { Component, OnInit, Input } from '@angular/core';
import { Musica } from './../../../core/models/musica.model'

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input() Musica: Musica
  @Input() showHeader: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  // sliceLetters(value: String): String {
  //   return `${value.slice(0, 100)}...`
  // }  
}
