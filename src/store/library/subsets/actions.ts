import {
  Subset,
  Series,
  UpdateSubsetServerResponse,
  SubsetActionTypes,
  GET_SUBSET_REQUEST,
  GET_SUBSET_SUCCESS,
  GET_SUBSET_FAILURE,
  UPDATE_SUBSET_REQUEST,
  UPDATE_SUBSET_SUCCESS,
  UPDATE_SUBSET_FAILURE,
  DELETE_SUBSET_REQUEST,
  DELETE_SUBSET_SUCCESS,
  DELETE_SUBSET_FAILURE,
  CREATE_SERIES_SUCCESS,
  CREATE_SERIES_REQUEST,
  CREATE_SERIES_FAILURE,
  CLEAR_LIBRARY,
} from "./types";

export const getSubsetSuccess = (subset: Subset): SubsetActionTypes => ({
  type: GET_SUBSET_SUCCESS,
  subset,
});
export const getSubsetRequest = (): SubsetActionTypes => ({
  type: GET_SUBSET_REQUEST,
});
export const getSubsetFailure = (): SubsetActionTypes => ({
  type: GET_SUBSET_FAILURE,
});

export const updateSubsetRequest = (): SubsetActionTypes => ({
  type: UPDATE_SUBSET_REQUEST,
});

export const updateSubsetSuccess = (
  updatedSubset: UpdateSubsetServerResponse
): SubsetActionTypes => ({
  type: UPDATE_SUBSET_SUCCESS,
  updatedSubset,
});
export const updateSubsetFailure = (): SubsetActionTypes => ({
  type: UPDATE_SUBSET_FAILURE,
});

export const deleteSubsetRequest = (): SubsetActionTypes => ({
  type: DELETE_SUBSET_REQUEST,
});
export const deleteSubsetSuccess = (): SubsetActionTypes => ({
  type: DELETE_SUBSET_SUCCESS,
});
export const deleteSubsetFailure = (): SubsetActionTypes => ({
  type: DELETE_SUBSET_FAILURE,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});

export const createSeriesRequest = (): SubsetActionTypes => ({
  type: CREATE_SERIES_REQUEST,
});
export const createSeriesSuccess = (series: Series): SubsetActionTypes => ({
  type: CREATE_SERIES_SUCCESS,
  series,
});
export const createSeriesFaillure = (): SubsetActionTypes => ({
  type: CREATE_SERIES_FAILURE,
});
