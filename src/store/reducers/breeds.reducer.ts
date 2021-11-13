import { createReducer, on } from '@ngrx/store';
import { loadBreeds, loadBreedsSuccess, loadBreedsError } from '../actions';

export interface breedsState {
    breeds: any[];
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number
}

export const breedsInitialState: breedsState = {
    breeds: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0
}

const _breedsReducer = createReducer(breedsInitialState,

    on(loadBreeds, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadBreedsSuccess, (state, { breeds, totalElements, number }) => ({
        ...state,
        loading: false,
        loaded: true,
        breeds: [...breeds],
        totalElements,
        number
    })),

    on(loadBreedsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function breedsReducer(state: any, action: any) {
    return _breedsReducer(state, action);
}