import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CardActionTypes } from "./types";

export const fetchCard =
  (cardId: number): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardRequest());
    fetch(`/api/cards/${cardId}`)
      .then((response) => {
        return response.json();
      })
      .then((cardData) => {
        dispatch(actions.getCardSuccess(cardData));
      })
      .catch((error) => {
        dispatch(actions.getCardFailure());
      });
  };

export const updateCard =
  (
    cardId: number,
    cardData: {
      name: string;
      number: string;
      rookie: boolean;
      teamId: number;
    }
  ): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateCardRequest());
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
        dispatch(actions.updateCardSuccess(updatedCard));
      })
      .catch((error) => {
        dispatch(actions.updateCardFailure());
      });
  };
