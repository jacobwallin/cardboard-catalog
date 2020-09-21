import {
  GET_SUBSETS,
  GET_SINGLE_SUBSET,
  Subset,
  SingleSubset,
  CollectionActionTypes,
} from "./types";

export const getSets = (subsets: Subset[]): CollectionActionTypes => ({
  type: GET_SUBSETS,
  subsets,
});

export const getSingleSet = (
  singleSubset: SingleSubset
): CollectionActionTypes => ({
  type: GET_SINGLE_SUBSET,
  singleSubset,
});
