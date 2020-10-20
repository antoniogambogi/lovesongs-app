import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { Banda } from 'src/app/core/models/banda.model';
import { Musica } from 'src/app/core/models/musica.model';
import { BandsService } from 'src/app/core/services/bands.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBandComponent } from '../update-band/update-band.component';


@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Band: Banda
  hasError: boolean = false
  bandName: String

  constructor(
    private service: BandsService,
    private toastr: MyToastrService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.bandName = this.activatedRoute.snapshot.params['bandName']
    this.findBandByName(this.bandName)
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

  openUpdateBandModal(): void{
    const dialogRef = this.dialog.open(UpdateBandComponent, {
      disableClose: true,
      width: '650px',
      height: '600px',
      data: this.Band
    })

    dialogRef.afterClosed().subscribe(updatedBand => {
      if (updatedBand) {
        this.Band = undefined
        this.findBandByName(this.bandName)
      }
    })
  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '160px',
      data: `Deseja apagar a banda ${this.Band['nome']}?`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed){
        this.deleteBand(this.Band['_id'])
      }
    })
  }

  deleteBand(bandId: String): void {
    this.httpRequest = this.service.deleteBandById(bandId).subscribe(response => {
      this.toastr.showToastrSuccess(`A banda ${this.Band['nome']} foi apagada com sucesso`)
      this.route.navigate(['/bands'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
