import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CollectionActionTypes } from "./types";

export const fetchCardsBySet =
  (): ThunkAction<any, RootState, any, CollectionActionTypes> => (dispatch) => {
    dispatch(actions.getCardsBySetRequest());

    return fetch("/api/collection/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(actions.setInitialDataLoad(true));
        dispatch(actions.getCardsBySetSuccess(data));
      })
      .catch((err) => console.log("ERROR FETCHING CARDS BY SET"));
  };

export const fetchCardsBySubset =
  (
    setId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    fetch(`/api/collection/set/${setId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(
          actions.getCardsBySubsetSuccess({ cardsBySubset: data, setId })
        );
      })
      .catch((err) => console.log("ERROR FETCHING CARDS BY SUBSET"));
  };

export const fetchCardsInSingleSubset =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    fetch(`/api/collection/subset/${subsetId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(
          actions.getSingleSubsetCardsSuccess({ cards: data, subsetId })
        );
      })
      .catch((err) => console.log("ERROR FETCHING CARDS FOR SINGLE SUBSET"));
  };

interface CardData {
  cardId: number;
  serialNumber?: number;
  grade?: number;
  gradingCompanyId?: number;
}

export const addCards =
  (
    cardData: CardData[],
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.addCardsRequest());

    fetch(`/api/collection/add`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ cardsToAdd: cardData }),
    })
      .then((response) => response.json())
      .then((newCards) => {
        dispatch(actions.addCardsSuccess(newCards, subsetId));
      })
      .catch((error) => dispatch(actions.addCardsFailure()));
  };

export const quickAddCards =
  (
    cardData: CardData[],
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.quickAddRequest());

    fetch(`/api/collection/add`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ cardsToAdd: cardData }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(actions.quickAddSuccess());
      })
      .catch((error) => dispatch(actions.quickAddFailure()));
  };

export const deleteCards =
  (
    userCardIds: number[]
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteCardsRequest());

    fetch(`/api/collection/delete/bulk`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ userCardIds }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(actions.deleteCardsSuccess(userCardIds));
      })
      .catch((error) => dispatch(actions.deleteCardsFailure()));
  };
