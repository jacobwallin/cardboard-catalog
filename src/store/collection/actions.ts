import {
  GET_CARDS_BY_SET,
  GET_CARDS_BY_SUBSET,
  GET_CARDS_IN_SINGLE_SUBSET,
  CLEAR_COLLECTION,
  SetCards,
  SubsetCards,
  UserCard,
  CollectionActionTypes,
} from "./types";

export const getCardsBySet = (
  cardsBySet: SetCards[]
): CollectionActionTypes => ({
  type: GET_CARDS_BY_SET,
  cardsBySet,
});

export const getCardsBySubset = (
  cardsBySubset: SubsetCards[]
): CollectionActionTypes => ({
  type: GET_CARDS_BY_SUBSET,
  cardsBySubset,
});

export const getSingleSubsetCards = (
  singleSubsetCards: UserCard[]
): CollectionActionTypes => ({
  type: GET_CARDS_IN_SINGLE_SUBSET,
  singleSubsetCards,
});

export const clearCollection = (): CollectionActionTypes => ({
  type: CLEAR_COLLECTION,
});
