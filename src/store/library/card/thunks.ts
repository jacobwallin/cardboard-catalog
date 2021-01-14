import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import {
  getCardByIdRequest,
  getCardByIdSuccess,
  updateCardRequest,
  updateCardSuccess,
} from "./actions";
import { CardActionTypes } from "./types";

export const fetchCardById = (
  cardId: number
): ThunkAction<void, RootState, unknown, CardActionTypes> => (dispatch) => {
  dispatch(getCardByIdRequest());
  fetch(`/api/cards/${cardId}`)
    .then((response) => {
      return response.json();
    })
    .then((cardData) => {
      dispatch(getCardByIdSuccess(cardData));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const updateCard = (
  cardId: number,
  cardData: {
    name: string;
    number: string;
    rookie: boolean;
    teamId: number;
  }
): ThunkAction<void, RootState, unknown, CardActionTypes> => (dispatch) => {
  dispatch(updateCardRequest());
  fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(cardData),
  })
    .then((response) => {
      return response.json();
    })
    .then((updatedCard) => {
      dispatch(updateCardSuccess(updatedCard));
    })
    .catch((error) => {
      console.log(error.message);
    });
};
