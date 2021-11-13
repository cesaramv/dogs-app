import { createReducer, on } from '@ngrx/store';
import { loadSubBreedsImages, loadSubBreedsImagesSuccess, loadSubBreedsImagesError } from '../actions';

export interface subBreedsImagesState {
    subBreedsImages: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number
}

export const subBreedsImagesInitialState: subBreedsImagesState = {
    subBreedsImages: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0
}

const _subBreedsImagesReducer = createReducer(subBreedsImagesInitialState,

    on(loadSubBreedsImages, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadSubBreedsImagesSuccess, (state, { subBreedsImages, totalElements, number }) => {
        return {
        ...state,
        loading: false,
        loaded: true,
        subBreedsImages: subBreedsImages,
        totalElements,
        number
    }}),

    on(loadSubBreedsImagesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function subBreedsImagesReducer(state: any, action: any) {
    return _subBreedsImagesReducer(state, action);
}