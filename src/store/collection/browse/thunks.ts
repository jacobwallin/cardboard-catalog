import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CollectionActionTypes, CardData, NewCardsResponse } from "./types";
import { get, post } from "../../../utils/fetch";

export const fetchCardsBySet =
  (): ThunkAction<any, RootState, any, CollectionActionTypes> => (dispatch) => {
    dispatch(actions.getCardsBySetRequest());
    get("/api/collection/", dispatch)
      .then((data) => {
        dispatch(actions.setInitialDataLoad(true));
        dispatch(actions.getCardsBySetSuccess(data));
      })
      .catch((err) => {
        dispatch(actions.getCardsBySetFailure());
      });
  };

export const fetchCardsBySubset =
  (
    setId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    get(`/api/collection/set/${setId}`, dispatch)
      .then((data) => {
        dispatch(
          actions.getCardsBySubsetSuccess({ cardsBySubset: data, setId })
        );
      })
      .catch((err) => {
        dispatch(actions.getCardsBySubsetFailure());
      });
  };

export const fetchCardsInSingleSubset =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    get(`/api/collection/subset/${subsetId}`, dispatch)
      .then((data) => {
        dispatch(
          actions.getSingleSubsetCardsSuccess({ cards: data, subsetId })
        );
      })
      .catch((err) => {
        dispatch(actions.getSingleSubsetCardsFailure());
      });
  };

export const addCards =
  (
    cardData: CardData[],
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.addCardsRequest());
    post(`/api/transactions/quickadd`, { cardsToAdd: cardData }, dispatch)
      .then((newCards: NewCardsResponse[]) => {
        dispatch(actions.addCardsSuccess(newCards, cardData, subsetId));
      })
      .catch((err) => {
        dispatch(actions.addCardsFailure());
      });
  };

export const deleteCards =
  (
    userCardIds: number[]
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteCardsRequest());

    post(`/api/collection/delete/bulk`, { userCardIds }, dispatch)
      .then((response) => {
        dispatch(actions.deleteCardsSuccess(userCardIds));
      })
      .catch((err) => {
        dispatch(actions.deleteCardsFailure());
      });
  };
