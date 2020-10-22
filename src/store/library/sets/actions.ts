import {
  SetSummary,
  Set,
  LibraryActionTypes,
  GET_ALL_SETS,
  GET_SET,
  CLEAR_LIBRARY,
} from "./types";

export const getAllSets = (allSets: SetSummary[]): LibraryActionTypes => ({
  type: GET_ALL_SETS,
  allSets,
});

export const getSet = (singleSet: Set): LibraryActionTypes => ({
  type: GET_SET,
  singleSet,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
