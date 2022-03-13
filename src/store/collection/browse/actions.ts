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
export const getCardsBySetFailure = (): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_FAILURE,
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
export const getCardsBySubsetFailure = (): CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_FAILURE,
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
export const getSingleSubsetCardsFailure = (): CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_FAILURE,
});

export const addCards = (
  newCards: types.UserCard[]
): CollectionActionTypes => ({
  type: types.ADD_CARDS,
  newCards,
});

export const deleteCards = (userCardIds: number[]): CollectionActionTypes => ({
  type: types.DELETE_CARDS,
  userCardIds,
});

export const setInitialDataLoad = (status: boolean): CollectionActionTypes => ({
  type: types.SET_INITIAL_DATA_LOAD,
  status,
});
