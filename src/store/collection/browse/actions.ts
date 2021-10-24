import {
  SetCards,
  SubsetCards,
  UserCard,
  CollectionActionTypes,
} from "./types";

import * as types from "./types";

export const getCardsBySetRequest = (): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_REQUEST,
});
export const getCardsBySetSuccess = (
  cardsBySet: SetCards[]
): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_SUCCESS,
  cardsBySet,
});
export const getCardsBySetError = (message: string): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_ERROR,
  message,
});

export const getCardsBySubsetRequest = (): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_REQUEST,
});
export const getCardsBySubsetSuccess = (payload: {
  cardsBySubset: SubsetCards[];
  setId: number;
}): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_SUCCESS,
  cardsBySubset: payload.cardsBySubset,
  setId: payload.setId,
});
export const getCardsBySubsetError = (
  message: string
): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_ERROR,
  message,
});

export const getSingleSubsetCardsRequest = (): CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_REQUEST,
});
export const getSingleSubsetCardsSuccess = (payload: {
  cards: UserCard[];
  subsetId: number;
}): CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  cards: payload.cards,
  subsetId: payload.subsetId,
});
export const getSingleSubsetCardsError = (
  message: string
): CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_ERROR,
  message,
});
export const addCardsRequest = (): CollectionActionTypes => ({
  type: types.ADD_CARDS_REQUEST,
});
export const addCardsSuccess = (
  newCards: UserCard[],
  subsetId: number
): CollectionActionTypes => ({
  type: types.ADD_CARDS_SUCCESS,
  newCards,
  subsetId,
});
export const addCardsFailure = (): CollectionActionTypes => ({
  type: types.ADD_CARDS_FAILURE,
});

export const quickAddRequest = (): CollectionActionTypes => ({
  type: types.QUICK_ADD_REQUEST,
});
export const quickAddSuccess = (): CollectionActionTypes => ({
  type: types.QUICK_ADD_SUCCESS,
});
export const quickAddFailure = (): CollectionActionTypes => ({
  type: types.QUICK_ADD_FAILURE,
});

export const deleteCardsRequest = (): CollectionActionTypes => ({
  type: types.DELETE_CARDS_REQUEST,
});
export const deleteCardsSuccess = (
  userCardIds: number[]
): CollectionActionTypes => ({
  type: types.DELETE_CARDS_SUCCESS,
  userCardIds,
});
export const deleteCardsFailure = (): CollectionActionTypes => ({
  type: types.DELETE_CARDS_FAILURE,
});

export const setInitialDataLoad = (status: boolean): CollectionActionTypes => ({
  type: types.SET_INITIAL_DATA_LOAD,
  status,
});

export const clearCollection = (): CollectionActionTypes => ({
  type: types.CLEAR_COLLECTION,
});
