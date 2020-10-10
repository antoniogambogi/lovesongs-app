import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatDialogRef } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { Banda } from './../../../core/models/banda.model'
import { BandsService } from './../../../core/services/bands.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { SongsService } from './../../../core/services/songs.service'
import { BandValidator } from './../../../core/validators/banda.validator'
import { SongValidator } from './../../../core/validators/musica.validator'
import * as moment from 'moment'

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit, OnDestroy {

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
    private songsService: SongsService,
    private dialogRef: MatDialogRef<NewSongComponent>,
    private bandValidator: BandValidator,
    private songValidator: SongValidator
  ) { }

  ngOnInit(): void {
    this.findAllBands()
    this.initializeSelectBandFormGroup()
    this.initializeSongFormGroup()
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

  initializeSongFormGroup(): void {
    this.songFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.songValidator.validatorUniqueSongName()),
      video: this.builder.control(null, [Validators.required]),
      album: this.builder.control(null),
      anoMusica: this.builder.control(null),
      letra: this.builder.control(null),
      banda: this.builder.control(null, [Validators.required])
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

  createNewSong(): void {
    this.setDateFormattedOnSongForm(this.songFormGroup.value['anoMusica'])
    this.httpRequest = this.songsService.createNewSong(this.songFormGroup.value).subscribe(response =>{
      this.toastr.showToastrSuccess(`A música ${response.body['data']['nome']} foi adicionada som sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close()
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
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

  songNameExists(): boolean {
    return this.songFormGroup.get('nome').hasError('songNameAlreadyExists')
  }
}
