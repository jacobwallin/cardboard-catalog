import {
  Subset,
  UpdateSubsetServerResponse,
  LibraryActionTypes,
  GET_SUBSET_REQUEST,
  GET_SUBSET_SUCCESS,
  UPDATE_SUBSET_REQUEST,
  UPDATE_SUBSET_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

export const getSubsetSuccess = (singleSubset: Subset): LibraryActionTypes => ({
  type: GET_SUBSET_SUCCESS,
  singleSubset,
});
export const getSubsetRequest = (): LibraryActionTypes => ({
  type: GET_SUBSET_REQUEST,
});
export const updateSubsetRequest = (): LibraryActionTypes => ({
  type: UPDATE_SUBSET_REQUEST,
});

export const updateSubsetSuccess = (
  updatedSubset: UpdateSubsetServerResponse
): LibraryActionTypes => ({
  type: UPDATE_SUBSET_SUCCESS,
  updatedSubset,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
