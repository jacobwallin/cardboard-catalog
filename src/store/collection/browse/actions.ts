import {
  GET_CARDS_BY_SET_SUCCESS,
  GET_CARDS_BY_SET_REQUEST,
  GET_CARDS_BY_SET_ERROR,
  GET_CARDS_BY_SUBSET_SUCCESS,
  GET_CARDS_BY_SUBSET_REQUEST,
  GET_CARDS_BY_SUBSET_ERROR,
  GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  GET_CARDS_IN_SINGLE_SUBSET_REQUEST,
  GET_CARDS_IN_SINGLE_SUBSET_ERROR,
  ADD_CARDS_REQUEST,
  ADD_CARDS_SUCCESS,
  ADD_CARDS_FAILURE,
  DELETE_CARDS_REQUEST,
  DELETE_CARDS_SUCCESS,
  DELETE_CARDS_FAILURE,
  SET_INITIAL_DATA_LOAD,
  CLEAR_COLLECTION,
  SetCards,
  SubsetCards,
  UserCard,
  CollectionActionTypes,
} from "./types";

export const getCardsBySetRequest = (): CollectionActionTypes => ({
  type: GET_CARDS_BY_SET_REQUEST,
});
export const getCardsBySetSuccess = (
  cardsBySet: SetCards[]
): CollectionActionTypes => ({
  type: GET_CARDS_BY_SET_SUCCESS,
  cardsBySet,
});
export const getCardsBySetError = (message: string): CollectionActionTypes => ({
  type: GET_CARDS_BY_SET_ERROR,
  message,
});

export const getCardsBySubsetRequest = (): CollectionActionTypes => ({
  type: GET_CARDS_BY_SUBSET_REQUEST,
});
export const getCardsBySubsetSuccess = (payload: {
  cardsBySubset: SubsetCards[];
  setId: number;
}): CollectionActionTypes => ({
  type: GET_CARDS_BY_SUBSET_SUCCESS,
  cardsBySubset: payload.cardsBySubset,
  setId: payload.setId,
});
export const getCardsBySubsetError = (
  message: string
): CollectionActionTypes => ({
  type: GET_CARDS_BY_SUBSET_ERROR,
  message,
});

export const getSingleSubsetCardsRequest = (): CollectionActionTypes => ({
  type: GET_CARDS_IN_SINGLE_SUBSET_REQUEST,
});
export const getSingleSubsetCardsSuccess = (payload: {
  cards: UserCard[];
  subsetId: number;
}): CollectionActionTypes => ({
  type: GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  cards: payload.cards,
  subsetId: payload.subsetId,
});
export const getSingleSubsetCardsError = (
  message: string
): CollectionActionTypes => ({
  type: GET_CARDS_IN_SINGLE_SUBSET_ERROR,
  message,
});
export const addCardsRequest = (): CollectionActionTypes => ({
  type: ADD_CARDS_REQUEST,
});
export const addCardsSuccess = (): CollectionActionTypes => ({
  type: ADD_CARDS_SUCCESS,
});
export const addCardsFailure = (): CollectionActionTypes => ({
  type: ADD_CARDS_FAILURE,
});
export const deleteCardsRequest = (): CollectionActionTypes => ({
  type: DELETE_CARDS_REQUEST,
});
export const deleteCardsSuccess = (
  userCardIds: number[]
): CollectionActionTypes => ({
  type: DELETE_CARDS_SUCCESS,
  userCardIds,
});
export const deleteCardsFailure = (): CollectionActionTypes => ({
  type: DELETE_CARDS_FAILURE,
});

export const setInitialDataLoad = (status: boolean): CollectionActionTypes => ({
  type: SET_INITIAL_DATA_LOAD,
  status,
});

export const clearCollection = (): CollectionActionTypes => ({
  type: CLEAR_COLLECTION,
});
