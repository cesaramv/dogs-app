//import { DepartmentsState } from './../reducers/departments.reducer';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { breedsImagesState, breedsState, subBreedsImagesState } from '../reducers';


export const getState = createFeatureSelector<breedsState>(
    'breeds'
);

export const getBreedsImages = createFeatureSelector<breedsImagesState>(
    'breedsImages'
);

export const getSubBreedsImages = createFeatureSelector<subBreedsImagesState>(
    'subBreedsImages'
);

export const getBreedsList = createSelector(
    getState,
    ({ breeds }) => breeds
);

export const getBreedsImagesList = createSelector(
    getBreedsImages,
    ({ breedsImages }) => {
        return breedsImages?.message;
    }
);

export const getSubBreedsImagesList = createSelector(
    getSubBreedsImages,
    ({ subBreedsImages }) => {
        return subBreedsImages?.message;
    }
);

export const getLoading = createSelector(
    getBreedsImages,
    getSubBreedsImages,
    (getBreedsImages, getSubBreedsImages) => {
        return getBreedsImages.loading || getSubBreedsImages.loading;
    }
);