import { createAction, props } from '@ngrx/store';

export const loadBreeds = createAction(
    '[Component Breeds] loadBreeds',
    props<{filtros: any}>()
);

export const loadBreedsSuccess = createAction(
    '[Breeds Component] List Breeds',
    props<{
        breeds: any[],
        totalElements: number,
        number: number
    }>()
);

export const loadBreedsError = createAction(
    '[Breeds Component] Error loader Breeds',
    props<{payload: any}>()
);

export const loadBreedSelected = createAction(
    '[Component Breeds] loadBreedSelected',
    props<{breed: string}>()
);