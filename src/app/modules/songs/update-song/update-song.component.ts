import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Musica } from 'src/app/core/models/musica.model';
import { Banda } from 'src/app/core/models/banda.model';
import { MatDialogRef } from '@angular/material/dialog'
import { BandsService } from 'src/app/core/services/bands.service';
import { SongsService } from 'src/app/core/services/songs.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import * as moment from "moment"

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Song: Musica
  songFormGroup: FormGroup
  bands: Banda[]

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Musica,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateSongComponent>,
    private bandsService: BandsService,
    private songsService: SongsService,
    private toastr: MyToastrService
  ) { 
    this.Song = data
  }

  ngOnInit(): void {
    this.findAllBands()
    this.initializeFormGroup()
    this.populateSongFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllBands(): void {
    this.httpRequest = this.bandsService.findAllBands().subscribe(response => {
      this.bands = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeFormGroup(): void {
    this.songFormGroup = this.builder.group({
      video: this.builder.control(null, [Validators.required]),
      album: this.builder.control(null, [Validators.required]),
      banda: this.builder.control(null, [Validators.required]),
      anoMusica: this.builder.control(null),
      letra: this.builder.control(null)
    })
  }

  populateSongFormGroup(): void {
    this.songFormGroup.patchValue({
      video: this.Song['video'],
      album: this.Song['album'],
      banda: this.Song['banda'],
      anoMusica: this.Song['anoMusica'],
      letra: this.Song['letra']
    })
  }

  compareBand(b1: Banda, b2: Banda): boolean {
    return b1 && b2 ? b1._id === b2._id : b1 === b2
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateSong(): void {
    this.setDateFormattedOnSongForm(this.songFormGroup.value['anoMusica'])
    this.httpRequest = this.songsService.updateSongById(this.Song['_id'], this.songFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`A música ${this.Song['nome']} foi atualizado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

  setDateFormattedOnSongForm(value: string): void{
    if(value){
      let dateFormatted: string = moment.utc(value).local().format('YYYY-MM-DD')
      this.songFormGroup.controls['anoMusica'].setValue(dateFormatted)
    }
  }

}
