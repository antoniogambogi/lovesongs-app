import { Injectable } from '@angular/core'
import { AsyncValidatorFn } from '@angular/forms'
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators'
import { BandsService } from './../services/bands.service'

@Injectable({
    providedIn: 'root'
})

export class BandValidator {

    constructor(
        private bandsService: BandsService
    ) { }

    validatorUniqueBandName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.bandsService.validatorUniqueBandName(value)),
                map((response) => {
                    if(response['data'] == 0 && control.value != null && control.value != ''){
                        return null
                    } else {
                        return {'bandNameAlreadyExists': true}
                    }
                }),
                first()
            )
    }
}