import { loadBreedSelected } from './../actions/breeds.actions';
import { createReducer, on } from '@ngrx/store';
import { loadBreeds, loadBreedsSuccess, loadBreedsError } from '../actions';

export interface breedSelectedState {
    breed: string;
}

export const breedSelectedInitialState: breedSelectedState = {
    breed: '',
}

const _breedSelectedReducer = createReducer(breedSelectedInitialState,
    on(loadBreedSelected, (state, { breed }) => ({ ...state, breed })),
);

export function breedSelectedReducer(state: any, action: any) {
    return _breedSelectedReducer(state, action);
}