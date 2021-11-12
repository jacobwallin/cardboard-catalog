import * as types from "./types";

export const getCardsRequest = (): types.FilterCollectionActions => ({
  type: types.GET_CARDS_REQUEST,
});
export const getCardsSuccess = (payload: {
  count: number;
  rows: types.UserCard[];
}): types.FilterCollectionActions => ({
  type: types.GET_CARDS_SUCCESS,
  payload,
});
export const getCardsFailure = (): types.FilterCollectionActions => ({
  type: types.GET_CARDS_FAILURE,
});

export const getPdfCardsRequest = (): types.FilterCollectionActions => ({
  type: types.GET_PDF_CARDS_REQUEST,
});
export const getPdfCardsSuccess = (payload: {
  count: number;
  rows: types.UserCard[];
}): types.FilterCollectionActions => ({
  type: types.GET_PDF_CARDS_SUCCESS,
  payload,
});
export const getPdfCardsFailure = (): types.FilterCollectionActions => ({
  type: types.GET_PDF_CARDS_FAILURE,
});
