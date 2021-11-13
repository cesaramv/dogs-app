import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    breeds: reducers.breedsState,
    breedsImages: reducers.breedsImagesState,
    subBreedsImages: reducers.subBreedsImagesState
}

export const appReducers: ActionReducerMap<AppState> = {
    breeds: reducers.breedsReducer,
    breedsImages: reducers.breedsImagesReducer,
    subBreedsImages: reducers.subBreedsImagesReducer
}