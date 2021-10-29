import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CollectionActionTypes } from "./types";
import { get, post } from "../../../utils/fetch";
import { logout, Logout } from "../../index";

type Actions = CollectionActionTypes | Logout;

export const fetchCardsBySet = (): ThunkAction<any, RootState, any, Actions> => (dispatch) => {
  dispatch(actions.getCardsBySetRequest());

  get("/api/collection/")
    .then((data) => {
      dispatch(actions.setInitialDataLoad(true));
      dispatch(actions.getCardsBySetSuccess(data));
    })
    .catch((err) => {
      if (err.status === 401) {
        dispatch(logout());
      } else {
        dispatch(actions.getCardsBySetFailure());
      }
    });
};

export const fetchCardsBySubset =
  (setId: number): ThunkAction<void, RootState, unknown, Actions> =>
  (dispatch) => {
    get(`/api/collection/set/${setId}`)
      .then((data) => {
        dispatch(actions.getCardsBySubsetSuccess({ cardsBySubset: data, setId }));
      })
      .catch((err) => {
        if (err.status === 401) {
          dispatch(logout());
        } else {
          dispatch(actions.getCardsBySubsetFailure());
        }
      });
  };

export const fetchCardsInSingleSubset =
  (subsetId: number): ThunkAction<void, RootState, unknown, Actions> =>
  (dispatch) => {
    get(`/api/collection/subset/${subsetId}`)
      .then((data) => {
        dispatch(actions.getSingleSubsetCardsSuccess({ cards: data, subsetId }));
      })
      .catch((err) => {
        if (err.status === 401) {
          dispatch(logout());
        } else {
          dispatch(actions.getSingleSubsetCardsFailure());
        }
      });
  };

interface CardData {
  cardId: number;
  serialNumber?: number;
  grade?: number;
  gradingCompanyId?: number;
}

export const addCards =
  (cardData: CardData[], subsetId: number): ThunkAction<void, RootState, unknown, Actions> =>
  (dispatch) => {
    dispatch(actions.addCardsRequest());
    post(`/api/collection/add`, { cardsToAdd: cardData })
      .then((newCards) => {
        dispatch(actions.addCardsSuccess(newCards, subsetId));
      })
      .catch((err) => {
        if (err.status === 401) {
          dispatch(logout());
        } else {
          dispatch(actions.addCardsFailure());
        }
      });
  };

export const deleteCards =
  (userCardIds: number[]): ThunkAction<void, RootState, unknown, Actions> =>
  (dispatch) => {
    dispatch(actions.deleteCardsRequest());

    post(`/api/collection/delete/bulk`, { userCardIds })
      .then((response) => {
        dispatch(actions.deleteCardsSuccess(userCardIds));
      })
      .catch((err) => {
        if (err.status === 401) {
          dispatch(logout());
        } else {
          dispatch(actions.deleteCardsFailure());
        }
      });
  };
