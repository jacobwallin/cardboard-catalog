import {
  Subset,
  UpdateSubsetServerResponse,
  LibraryActionTypes,
  GET_SUBSET_REQUEST,
  GET_SUBSET_SUCCESS,
  GET_SUBSET_FAILURE,
  UPDATE_SUBSET_REQUEST,
  UPDATE_SUBSET_SUCCESS,
  UPDATE_SUBSET_FAILURE,
  CLEAR_LIBRARY,
} from "./types";

export const getSubsetSuccess = (subset: Subset): LibraryActionTypes => ({
  type: GET_SUBSET_SUCCESS,
  subset,
});
export const getSubsetRequest = (): LibraryActionTypes => ({
  type: GET_SUBSET_REQUEST,
});
export const getSubsetFailure = (): LibraryActionTypes => ({
  type: GET_SUBSET_FAILURE,
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
export const updateSubsetFailure = (): LibraryActionTypes => ({
  type: UPDATE_SUBSET_FAILURE,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
