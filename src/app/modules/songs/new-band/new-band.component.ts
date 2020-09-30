import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatDialogRef } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { Banda } from './../../../core/models/banda.model'
import { BandsService } from './../../../core/services/bands.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { BandValidator } from './../../../core/validators/banda.validator'
import * as moment from 'moment'

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.css']
})
export class NewBandComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  bandFormGroup: FormGroup
  isNewBand: boolean = false
  bandas: Banda[]
  stepBandLabel: String = 'Banda'
  songFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private bandsService: BandsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<NewBandComponent>,
    private bandValidator: BandValidator,
  ) { }

  ngOnInit(): void {
    this.findAllBands()
    this.initializeSelectBandFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllBands(): void {
    this.httpRequest = this.bandsService.findAllBands().subscribe(response => {
      this.bandas = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectBandFormGroup(): void {
    this.bandFormGroup = this.builder.group({
      banda: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewBandFormGroup(): void {
    this.bandFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.bandValidator.validatorUniqueBandName()),
      genero: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  newBand(): void {
    this.isNewBand = !this.isNewBand
    this.initializeNewBandFormGroup()
  }

  selectBand(): void {
    this.isNewBand = !this.isNewBand
    this.findAllBands()
    this.initializeSelectBandFormGroup()
  }

  nextStep(): void {
    if (this.isNewBand) {
      this.createNewBand(this.bandFormGroup.value)
    } else {
      this.songFormGroup.controls['banda'].setValue(this.bandFormGroup.value['banda']['_id'])
      this.stepBandLabel = `Banda: ${this.bandFormGroup.value['banda']['nome']}`
    }
  }

  createNewBand(formValueBand: Banda): void {
    this.httpRequest = this.bandsService.createNewBand(formValueBand).subscribe(response => {
      this.songFormGroup.controls['banda'].setValue(response.body['data']['_id'])      
      this.stepBandLabel = `Banda: ${response.body['data']['nome']}`
      this.toastr.showToastrSuccess(`A banda ${response.body['data']['nome']} foi adicionada com sucesso.`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  setDateFormattedOnSongForm(value: string): void{
    if(value){
      let dateFormatted: string = moment.utc(value).local().format('YYYY-MM-DD')
      this.songFormGroup.controls['anoMusica'].setValue(dateFormatted)
    }
  }

  bandNameExists(): boolean {
    return this.bandFormGroup.get('nome').hasError('bandNameAlreadyExists')
  }

}
