import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {BandsService } from 'src/app/core/services/bands.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import {BandValidator } from 'src/app/core/validators/banda.validator';

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.css']
})
export class NewBandComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  bandFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private service:BandsService,
    private validator: BandValidator,
    private dialogRef: MatDialogRef<NewBandComponent>
  ) { }

  ngOnInit(): void {
    this.initializeBandForm()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  initializeBandForm(): void {
    this.bandFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.validator.validatorUniqueBandName()),
      imagem: this.builder.control(null),
      genero: this.builder.control(null)
    })
  }

  bandNameExists(): boolean {
    return this.bandFormGroup.get('nome').hasError('bandNameAlreadyExists')
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  createNewBand(): void{
    this.httpRequest = this.service.createNewBand(this.bandFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`A banda ${response.body['data']['nome']} foi adicionada com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}