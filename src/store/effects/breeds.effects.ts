import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as breedsActions from '../actions/breeds.actions';
import { BreedsService } from '../../app/core/services/breeds.service';

@Injectable()
export class BreedsEffects {

    constructor(
        private actions$: Actions,
        private readonly breedsService: BreedsService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(breedsActions.loadBreeds),
        mergeMap(({ filtros }) =>this.breedsService.getBreeds(filtros)
            .pipe(
                map(( datos: any ) => {
                    return breedsActions.loadBreedsSuccess({
                        breeds: datos,
                        totalElements : datos.length + 1,
                        number : 0
                    })
                }),
                catchError(err => of(breedsActions.loadBreedsError({ payload: err })))
            )
        )
    ));
}