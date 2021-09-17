import {
  SetSummary,
  Set,
  SubsetSummary,
  UpdateSetServerResponse,
  SetsActionTypes,
  GET_ALL_SETS_REQUEST,
  GET_ALL_SETS_SUCCESS,
  GET_ALL_SETS_FAILURE,
  GET_SINGLE_SET_REQUEST,
  GET_SINGLE_SET_SUCCESS,
  GET_SINGLE_SET_FAILURE,
  UPDATE_SET_REQUEST,
  UPDATE_SET_SUCCESS,
  UPDATE_SET_FAILURE,
  DELETE_SET_REQUEST,
  DELETE_SET_SUCCESS,
  DELETE_SET_FAILURE,
  CREATE_SUBSET_REQUEST,
  CREATE_SUBSET_SUCCESS,
  CREATE_SUBSET_FAILURE,
  CREATE_SET_REQUEST,
  CREATE_SET_SUCCESS,
  CREATE_SET_FAILURE,
  CLEAR_LIBRARY,
} from "./types";

export const getAllSetsRequest = (): SetsActionTypes => ({
  type: GET_ALL_SETS_REQUEST,
});
export const getAllSetsSuccess = (allSets: SetSummary[]): SetsActionTypes => ({
  type: GET_ALL_SETS_SUCCESS,
  allSets,
});
export const getAllSetsFailure = (): SetsActionTypes => ({
  type: GET_ALL_SETS_FAILURE,
});

export const getSingleSetRequest = (): SetsActionTypes => ({
  type: GET_SINGLE_SET_REQUEST,
});
export const getSingleSetSuccess = (singleSet: Set): SetsActionTypes => ({
  type: GET_SINGLE_SET_SUCCESS,
  singleSet,
});
export const getSingleSetFailure = (): SetsActionTypes => ({
  type: GET_SINGLE_SET_FAILURE,
});

export const updateSetRequest = (): SetsActionTypes => ({
  type: UPDATE_SET_REQUEST,
});
export const updateSetSuccess = (
  updatedSet: UpdateSetServerResponse
): SetsActionTypes => ({
  type: UPDATE_SET_SUCCESS,
  updatedSet,
});
export const updateSetFailure = (): SetsActionTypes => ({
  type: UPDATE_SET_FAILURE,
});

export const deleteSetRequest = (): SetsActionTypes => ({
  type: DELETE_SET_REQUEST,
});
export const deleteSetSuccess = (setId: number): SetsActionTypes => ({
  type: DELETE_SET_SUCCESS,
  setId,
});
export const deleteSetFailure = (): SetsActionTypes => ({
  type: DELETE_SET_FAILURE,
});

export const createSubsetRequest = (): SetsActionTypes => ({
  type: CREATE_SUBSET_REQUEST,
});
export const createSubsetSuccess = (
  subset: SubsetSummary
): SetsActionTypes => ({
  type: CREATE_SUBSET_SUCCESS,
  subset,
});
export const createSubsetFailure = (): SetsActionTypes => ({
  type: CREATE_SUBSET_FAILURE,
});

export const createSetRequest = (): SetsActionTypes => ({
  type: CREATE_SET_REQUEST,
});
export const createSetSuccess = (set: SetSummary): SetsActionTypes => ({
  type: CREATE_SET_SUCCESS,
  set,
});
export const createSetFailure = (): SetsActionTypes => ({
  type: CREATE_SET_FAILURE,
});

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
