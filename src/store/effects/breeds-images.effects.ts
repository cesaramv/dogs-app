import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as breedsImagesActions from '../actions/breeds-images.actions';
import { BreedsService } from '../../app/core/services/breeds.service';

@Injectable()
export class BreedsImagesEffects {

    constructor(
        private actions$: Actions,
        private readonly breedsService: BreedsService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(breedsImagesActions.loadBreedsImages),
        mergeMap(({ filtros }) =>this.breedsService.getImagesBreed(filtros)
            .pipe(
                map(( datos: any ) => {
                    return breedsImagesActions.loadBreedsImagesSuccess({
                        breedsImages: datos,
                        totalElements : datos.length + 1,
                        number : 0
                    })
                }),
                catchError(err => of(breedsImagesActions.loadBreedsImagesError({ payload: err })))
            )
        )
    ));
}