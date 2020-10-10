import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Banda } from 'src/app/core/models/banda.model';
import { BandsService } from 'src/app/core/services/bands.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';

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
    private toastr: MyToastrService
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

}

