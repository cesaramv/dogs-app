import { createAction, props } from '@ngrx/store';

export const loadBreedsImages = createAction(
    '[Component BreedsImages] loadBreedsImages',
    props<{filtros: any}>()
);

export const loadBreedsImagesSuccess = createAction(
    '[BreedsImages Component] List BreedsImages',
    props<{
        breedsImages: any[],
        totalElements: number,
        number: number
    }>()
);

export const loadBreedsImagesError = createAction(
    '[BreedsImages Component] Error loader BreedsImages',
    props<{payload: any}>()
);
