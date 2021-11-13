import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as subBreedsImagesActions from '../actions/sub-breeds-images.actions';
import { BreedsService } from '../../app/core/services/breeds.service';

@Injectable()
export class SubBreedsImagesEffects {

    constructor(
        private actions$: Actions,
        private readonly subBreedsService: BreedsService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(subBreedsImagesActions.loadSubBreedsImages),
        mergeMap(({ filtros }) =>this.subBreedsService.getImagesSubBreed(filtros)
            .pipe(
                map(( datos: any ) => {
                    return subBreedsImagesActions.loadSubBreedsImagesSuccess({
                        subBreedsImages: datos,
                        totalElements : datos.length + 1,
                        number : 0
                    })
                }),
                catchError(err => of(subBreedsImagesActions.loadSubBreedsImagesError({ payload: err })))
            )
        )
    ));
}