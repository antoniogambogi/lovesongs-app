import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banda } from 'src/app/core/models/banda.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BandsService } from 'src/app/core/services/bands.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-update-band',
  templateUrl: './update-band.component.html',
  styleUrls: ['./update-band.component.css']
})
export class UpdateBandComponent implements OnInit {

  private httpRequest: Subscription

  Band: Banda
  bandFormGroup: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Banda,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateBandComponent>,
    private bandsService: BandsService,
    private toastr: MyToastrService
  ) {
    this.Band = data
  }

  ngOnInit(): void {
    this.initializeBandFormGroup()
    this.populateBandFormGroup()
  }

  //ngOnDestroy removido

  initializeBandFormGroup(): void {
    this.bandFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required]),
      genero: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  populateBandFormGroup(): void {
    this.bandFormGroup.patchValue({
      nome: this.Band['nome'],
      genero: this.Band['genero'],
      imagem: this.Band['imagem']
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateBand(): void {
    console.log(this.Band)
    this.httpRequest = this.bandsService.updateBandById(this.Band['_id'], this.bandFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`A banda ${this.Band['nome']} foi atualizada com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
