import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CardActionTypes } from "./types";

export const fetchCard =
  (
    cardDataId: number
  ): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardRequest());
    fetch(`/api/carddata/${cardDataId}`)
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
    cardDataId: number,
    cardData: {
      name: string;
      number: string;
      rookie: boolean;
      teamId: number;
      playerIds: number[];
    }
  ): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateCardRequest());
    fetch(`/api/carddata/${cardDataId}`, {
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
