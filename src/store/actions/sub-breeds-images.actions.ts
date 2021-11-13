import { createAction, props } from '@ngrx/store';

export const loadSubBreedsImages = createAction(
    '[Component SubBreedsImages] loadSubBreedsImages',
    props<{filtros: any}>()
);

export const loadSubBreedsImagesSuccess = createAction(
    '[SubBreedsImages Component] List SubBreedsImages',
    props<{
        subBreedsImages: any[],
        totalElements: number,
        number: number
    }>()
);

export const loadSubBreedsImagesError = createAction(
    '[SubBreedsImages Component] Error loader SubBreedsImages',
    props<{payload: any}>()
);
