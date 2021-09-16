import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {
  getCardsBySetSuccess,
  getCardsBySetRequest,
  getCardsBySubsetSuccess,
  getSingleSubsetCardsSuccess,
  addCardsRequest,
  addCardsSuccess,
  addCardsFailure,
  setInitialDataLoad,
} from "./actions";
import { CollectionActionTypes } from "./types";

export const fetchCardsBySet =
  (): ThunkAction<any, RootState, any, CollectionActionTypes> => (dispatch) => {
    dispatch(getCardsBySetRequest());

    return fetch("/api/collection/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setInitialDataLoad(true));
        dispatch(getCardsBySetSuccess(data));
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
        dispatch(getCardsBySubsetSuccess({ cardsBySubset: data, setId }));
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
        dispatch(getSingleSubsetCardsSuccess({ cards: data, subsetId }));
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
    cardData: CardData[]
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(addCardsRequest());

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
      .then((responseJson) => {
        dispatch(addCardsSuccess());
      })
      .catch((error) => dispatch(addCardsFailure()));
  };
