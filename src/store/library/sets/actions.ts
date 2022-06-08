import * as types from "./types";
import { SubsetInstance } from "../subsets/types";

export const getAllSetsRequest = (): types.SetsActionTypes => ({
  type: types.GET_ALL_SETS_REQUEST,
});
export const getAllSetsSuccess = (allSets: {
  rows: types.SetSummary[];
  count: number;
}): types.SetsActionTypes => ({
  type: types.GET_ALL_SETS_SUCCESS,
  allSets,
});
export const getAllSetsFailure = (): types.SetsActionTypes => ({
  type: types.GET_ALL_SETS_FAILURE,
});

export const getAllSetYearsRequest = (): types.SetsActionTypes => ({
  type: types.GET_ALL_SET_YEARS_REQUEST,
});
export const getAllSetYearsSuccess = (
  years: types.Year[]
): types.SetsActionTypes => ({
  type: types.GET_ALL_SET_YEARS_SUCCESS,
  years,
});
export const getAllSetYearsFailure = (): types.SetsActionTypes => ({
  type: types.GET_ALL_SET_YEARS_FAILURE,
});

export const getSingleSetRequest = (): types.SetsActionTypes => ({
  type: types.GET_SINGLE_SET_REQUEST,
});
export const getSingleSetSuccess = (
  singleSet: types.Set
): types.SetsActionTypes => ({
  type: types.GET_SINGLE_SET_SUCCESS,
  singleSet,
});
export const getSingleSetFailure = (): types.SetsActionTypes => ({
  type: types.GET_SINGLE_SET_FAILURE,
});

export const updateSetRequest = (): types.SetsActionTypes => ({
  type: types.UPDATE_SET_REQUEST,
});
export const updateSetSuccess = (
  updatedSet: types.UpdatedSet
): types.SetsActionTypes => ({
  type: types.UPDATE_SET_SUCCESS,
  updatedSet,
});
export const updateSetFailure = (): types.SetsActionTypes => ({
  type: types.UPDATE_SET_FAILURE,
});

export const deleteSetRequest = (): types.SetsActionTypes => ({
  type: types.DELETE_SET_REQUEST,
});
export const deleteSetSuccess = (setId: number): types.SetsActionTypes => ({
  type: types.DELETE_SET_SUCCESS,
  setId,
});
export const deleteSetFailure = (): types.SetsActionTypes => ({
  type: types.DELETE_SET_FAILURE,
});

export const createSubsetRequest = (): types.SetsActionTypes => ({
  type: types.CREATE_SUBSET_REQUEST,
});
export const createSubsetSuccess = (
  subset: SubsetInstance
): types.SetsActionTypes => ({
  type: types.CREATE_SUBSET_SUCCESS,
  subset,
});
export const createSubsetFailure = (): types.SetsActionTypes => ({
  type: types.CREATE_SUBSET_FAILURE,
});

export const createSetRequest = (): types.SetsActionTypes => ({
  type: types.CREATE_SET_REQUEST,
});
export const createSetSuccess = (
  set: types.SetSummary
): types.SetsActionTypes => ({
  type: types.CREATE_SET_SUCCESS,
  set,
});
export const createSetFailure = (): types.SetsActionTypes => ({
  type: types.CREATE_SET_FAILURE,
});

export const clearLibrary = () => ({
  type: types.CLEAR_LIBRARY,
});
