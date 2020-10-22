import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {
  getCardsBySetSuccess,
  getCardsBySubsetSuccess,
  getSingleSubsetCardsSuccess,
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
      dispatch(getCardsBySetSuccess(data));
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
      dispatch(getCardsBySubsetSuccess(data));
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
      dispatch(getSingleSubsetCardsSuccess(data));
    })
    .catch((err) => console.log("ERROR FETCHING CARDS FOR SINGLE SUBSET"));
};
