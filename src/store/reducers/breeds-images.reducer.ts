import { createReducer, on } from '@ngrx/store';
import { loadBreedsImages, loadBreedsImagesSuccess, loadBreedsImagesError } from '../actions';

export interface breedsImagesState {
    breedsImages: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number
}

export const breedsImagesInitialState: breedsImagesState = {
    breedsImages: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0
}

const _breedsImagesReducer = createReducer(breedsImagesInitialState,

    on(loadBreedsImages, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadBreedsImagesSuccess, (state, { breedsImages, totalElements, number }) => {
        return {
        ...state,
        loading: false,
        loaded: true,
        breedsImages: breedsImages,
        totalElements,
        number
    }}),

    on(loadBreedsImagesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function breedsImagesReducer(state: any, action: any) {
    return _breedsImagesReducer(state, action);
}