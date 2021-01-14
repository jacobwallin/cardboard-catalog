import {
  GET_CARD_BY_ID_REQUEST,
  GET_CARD_BY_ID_SUCCESS,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  CardActionTypes,
  CardState,
} from "./types";

export const getCardByIdRequest = (): CardActionTypes => ({
  type: GET_CARD_BY_ID_REQUEST,
});

export const getCardByIdSuccess = (card: CardState): CardActionTypes => ({
  type: GET_CARD_BY_ID_SUCCESS,
  card,
});

export const updateCardRequest = (): CardActionTypes => ({
  type: UPDATE_CARD_REQUEST,
});

export const updateCardSuccess = (updatedCard: CardState): CardActionTypes => ({
  type: UPDATE_CARD_SUCCESS,
  updatedCard,
});
