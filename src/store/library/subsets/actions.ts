import { Subset, LibraryActionTypes, GET_SUBSET, CLEAR_LIBRARY } from "./types";

export const getSubset = (singleSubset: Subset): LibraryActionTypes => ({
  type: GET_SUBSET,
  singleSubset,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
