import {
  Subset,
  Set,
  LibraryActionTypes,
  GET_SUBSET,
  GET_ALL_SETS,
} from "./types";

export const getSubset = (subset: Subset): LibraryActionTypes => {
  return {
    type: GET_SUBSET,
    subset,
  };
};
export const getAllSets = (allSets: Set[]): LibraryActionTypes => {
  return {
    type: GET_ALL_SETS,
    allSets,
  };
};
