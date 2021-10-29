import * as types from "./types";

export const getCardsRequest = (): types.FilterCollectionActions => ({
  type: types.GET_CARDS_REQUEST,
});
export const getCardsSuccess = (
  payload: types.FilterCollectionState
): types.FilterCollectionActions => ({
  type: types.GET_CARDS_SUCCESS,
  payload,
});
export const getCardsFailure = (): types.FilterCollectionActions => ({
  type: types.GET_CARDS_FAILURE,
});
