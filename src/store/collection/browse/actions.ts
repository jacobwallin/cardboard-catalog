import * as types from "./types";

export const getCardsBySetRequest = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_REQUEST,
});
export const getCardsBySetSuccess = (
  cardsBySet: types.SetCards[]
): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_SUCCESS,
  cardsBySet,
});
export const getCardsBySetFailure = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SET_FAILURE,
});

export const getCardsBySubsetRequest = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_REQUEST,
});
export const getCardsBySubsetSuccess = (payload: {
  cardsBySubset: types.SubsetCards[];
  setId: number;
}): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_SUCCESS,
  cardsBySubset: payload.cardsBySubset,
  setId: payload.setId,
});
export const getCardsBySubsetFailure = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_BY_SUBSET_FAILURE,
});

export const getSingleSubsetCardsRequest = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_REQUEST,
});
export const getSingleSubsetCardsSuccess = (payload: {
  cards: types.UserCard[];
  subsetId: number;
}): types.CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  cards: payload.cards,
  subsetId: payload.subsetId,
});
export const getSingleSubsetCardsFailure = (): types.CollectionActionTypes => ({
  type: types.GET_CARDS_IN_SINGLE_SUBSET_FAILURE,
});

export const addCards = (
  newCards: types.UserCard[]
): types.CollectionActionTypes => ({
  type: types.ADD_CARDS,
  newCards,
});

export const deleteCards = (
  userCardIds: number[]
): types.CollectionActionTypes => ({
  type: types.DELETE_CARDS,
  userCardIds,
});

export const setInitialDataLoad = (
  status: boolean
): types.CollectionActionTypes => ({
  type: types.SET_INITIAL_DATA_LOAD,
  status,
});

export const viewFriendCollection = (
  friend: types.Friend
): types.CollectionActionTypes => ({
  type: types.SET_FRIEND,
  friend,
});

export const viewMyCollection = (): types.CollectionActionTypes => ({
  type: types.REMOVE_FRIEND,
});
export const clearCollectionData = (): types.CollectionActionTypes => ({
  type: types.CLEAR_COLLECTION_DATA,
});
