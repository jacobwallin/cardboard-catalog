import {
  GET_SUBSETS,
  GET_SINGLE_SUBSET,
  CLEAR_SINGLE_SUBSET,
  CLEAR_SUBSETS,
  Subset,
  SingleSubset,
  CollectionActionTypes,
} from "./types";

export const getSets = (subsets: Subset[]): CollectionActionTypes => ({
  type: GET_SUBSETS,
  subsets,
});

export const clearSubsets = (): CollectionActionTypes => ({
  type: CLEAR_SUBSETS,
});

export const getSingleSet = (
  singleSubset: SingleSubset
): CollectionActionTypes => ({
  type: GET_SINGLE_SUBSET,
  singleSubset,
});

export const clearSingleSubset = (): CollectionActionTypes => ({
  type: CLEAR_SINGLE_SUBSET,
});
