import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Banda } from 'src/app/core/models/banda.model';
import { BandsService } from 'src/app/core/services/bands.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Band: Banda
  hasError: boolean = false

  constructor(
    private service: BandsService,
    private toastr: MyToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const bandName: String = this.activatedRoute.snapshot.params['bandName']
    this.findBandByName(bandName)
  }

  ngOnDestroy(): void{
    this.httpRequest.unsubscribe()
  }

  countSongsOnBand(nSongs: Number): String{
    return nSongs > 1 ? `${nSongs} musicas disponíveis`: `${nSongs} musica disponível`
  }

  findBandByName(bandName: String): void {
    this.httpRequest = this.service.findBandByName(bandName).subscribe(response => {
      this.Band = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error.message}`)
      this.hasError = true
    })
  }

  titleSongsOnBand(nSongs: Number): String{
    if(nSongs > 1) {
      return 'Músicas tocada pela banda'
    }else if(nSongs == 1) {
      return 'Músicas tocada pela banda'
    }else {
      return 'Não há músicas tocadas pela banda'
    }
  }
}
