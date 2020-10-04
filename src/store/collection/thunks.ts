import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {
  getCardsBySet,
  getCardsBySubset,
  getSingleSubsetCards,
} from "./actions";
import { CollectionActionTypes } from "./types";

export const fetchCardsBySet = (): ThunkAction<
  void,
  RootState,
  unknown,
  CollectionActionTypes
> => (dispatch) => {
  fetch("/api/collection/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getCardsBySet(data));
    })
    .catch((err) => console.log("ERROR FETCHING CARDS BY SET"));
};

export const fetchCardsBySubset = (
  setId: number
): ThunkAction<void, RootState, unknown, CollectionActionTypes> => (
  dispatch
) => {
  fetch(`/api/collection/set/${setId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getCardsBySubset(data));
    })
    .catch((err) => console.log("ERROR FETCHING CARDS BY SUBSET"));
};

export const fetchCardsInSingleSubset = (
  subsetId: number
): ThunkAction<void, RootState, unknown, CollectionActionTypes> => (
  dispatch
) => {
  fetch(`/api/collection/subset/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSingleSubsetCards(data));
    })
    .catch((err) => console.log("ERROR FETCHING CARDS FOR SINGLE SUBSET"));
};
