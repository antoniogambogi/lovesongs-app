import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Banda } from 'src/app/core/models/banda.model';
import { BandsService } from 'src/app/core/services/bands.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { NewBandComponent } from './new-band/new-band.component';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  bands: Banda[]
  hasError: boolean = false


  constructor(
    private service: BandsService,
    private toastr: MyToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllBands()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllBands(): void {
    this.httpRequest = this.service.findAllBands().subscribe(response => {
      this.bands = response.body['data']
    }, err => {
      this.hasError = true
      this.toastr.showToastrError(`${err.status} - ${err.error.message}`)
    })
  }

  openNewBandModal(): void {
    const dialogRef = this.dialog.open(NewBandComponent, {
      disableClose: true,
      width: '650px',
      height: '600px'
    })

    dialogRef.afterClosed().subscribe(newBandAdded => {
      if (newBandAdded) {
        this.bands = undefined
        this.findAllBands()
      }
    })
  }
}

