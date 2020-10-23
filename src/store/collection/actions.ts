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
export const getCardsBySubsetSuccess = (
  cardsBySubset: SubsetCards[]
): CollectionActionTypes => ({
  type: GET_CARDS_BY_SUBSET_SUCCESS,
  cardsBySubset,
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
  subsetId: string;
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

export const clearCollection = (): CollectionActionTypes => ({
  type: CLEAR_COLLECTION,
});
