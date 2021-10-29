import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CardActionTypes } from "./types";
import { get, put, del } from "../../../utils/fetch";

export const fetchCard =
  (cardDataId: number): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardRequest());
    get(`/api/carddata/${cardDataId}`, dispatch)
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
      teamId: number | undefined;
      note: string;
      playerIds: number[];
    }
  ): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateCardRequest());
    put(`/api/carddata/${cardDataId}`, cardData, dispatch)
      .then((updatedCard) => {
        dispatch(actions.updateCardSuccess(updatedCard));
      })
      .catch((error) => {
        dispatch(actions.updateCardFailure());
      });
  };

export const deleteCard =
  (cardDataId: number): ThunkAction<void, RootState, unknown, CardActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteCardRequest());
    del(`/api/carddata/${cardDataId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteCardSuccess());
      })
      .catch((error) => {
        dispatch(actions.deleteCardFailure());
      });
  };
