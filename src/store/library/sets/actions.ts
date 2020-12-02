import {
  SetSummary,
  Set,
  UpdateSetServerResponse,
  SetsActionTypes,
  GET_ALL_SETS_REQUEST,
  GET_ALL_SETS_SUCCESS,
  GET_SINGLE_SET_REQUEST,
  GET_SINGLE_SET_SUCCESS,
  UPDATE_SET_REQUEST,
  UPDATE_SET_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

export const getAllSetsRequest = (): SetsActionTypes => ({
  type: GET_ALL_SETS_REQUEST,
});

export const getAllSetsSuccess = (allSets: SetSummary[]): SetsActionTypes => ({
  type: GET_ALL_SETS_SUCCESS,
  allSets,
});

export const getSingleSetRequest = (): SetsActionTypes => ({
  type: GET_SINGLE_SET_REQUEST,
});

export const getSingleSetSuccess = (singleSet: Set): SetsActionTypes => ({
  type: GET_SINGLE_SET_SUCCESS,
  singleSet,
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

export const clearLibrary = () => ({
  type: CLEAR_LIBRARY,
});
