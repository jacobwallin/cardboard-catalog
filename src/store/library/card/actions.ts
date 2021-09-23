import {
  GET_CARD_REQUEST,
  GET_CARD_SUCCESS,
  GET_CARD_FAILURE,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  CardActionTypes,
  CardState,
} from "./types";

export const getCardRequest = (): CardActionTypes => ({
  type: GET_CARD_REQUEST,
});

export const getCardSuccess = (card: CardState): CardActionTypes => ({
  type: GET_CARD_SUCCESS,
  card,
});
export const getCardFailure = (): CardActionTypes => ({
  type: GET_CARD_FAILURE,
});

export const updateCardRequest = (): CardActionTypes => ({
  type: UPDATE_CARD_REQUEST,
});

export const updateCardSuccess = (updatedCard: CardState): CardActionTypes => ({
  type: UPDATE_CARD_SUCCESS,
  updatedCard,
});
export const updateCardFailure = (): CardActionTypes => ({
  type: UPDATE_CARD_FAILURE,
});

export const deleteCardRequest = (): CardActionTypes => ({
  type: DELETE_CARD_REQUEST,
});
export const deleteCardSuccess = (): CardActionTypes => ({
  type: DELETE_CARD_SUCCESS,
});
export const deleteCardFailure = (): CardActionTypes => ({
  type: DELETE_CARD_FAILURE,
});
