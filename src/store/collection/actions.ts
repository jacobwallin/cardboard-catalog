import {
  GET_SETS,
  GET_SINGLE_SET,
  Set,
  SingleSet,
  CollectionActionTypes,
} from "./types";

export const getSets = (sets: Set[]): CollectionActionTypes => ({
  type: GET_SETS,
  sets,
});

export const getSingleSet = (singleSet: SingleSet): CollectionActionTypes => ({
  type: GET_SINGLE_SET,
  singleSet,
});
