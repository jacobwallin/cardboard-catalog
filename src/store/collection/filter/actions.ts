import {
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,
  FilterCollectionState,
  FilterCollectionActions,
} from "./types";

export const getCardsRequest = (): FilterCollectionActions => ({
  type: GET_CARDS_REQUEST,
});
export const getCardsSuccess = (
  payload: FilterCollectionState
): FilterCollectionActions => ({
  type: GET_CARDS_SUCCESS,
  payload,
});
export const getCardsFailure = (): FilterCollectionActions => ({
  type: GET_CARDS_FAILURE,
});
