import { Injectable } from '@angular/core'
import { AsyncValidatorFn } from '@angular/forms'
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators'
import { SongsService } from './../services/songs.service'

@Injectable({
    providedIn: 'root'
})

export class SongValidator {

    constructor(
        private songsService: SongsService
    ) { }

    validatorUniqueSongName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.songsService.validatorUniqueSongName(value)),
                map((response) => {
                    if(response['data'] == 0 && control.value != null && control.value != ''){
                        return null
                    } else {
                        return {'songNameAlreadyExists': true}
                    }
                }),
                first()
            )
    }
}