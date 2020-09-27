import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { getSets, getSingleSet } from "./actions";
import { CollectionActionTypes } from "./types";

export const fetchCollectionSubsets = (): ThunkAction<
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
      dispatch(getSets(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SETS THUNK"));
};

export const fetchSubsetUserCards = (
  subsetId: number
): ThunkAction<void, RootState, unknown, CollectionActionTypes> => (
  dispatch
) => {
  fetch(`/api/collection/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSingleSet(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SINGLE SET THUNK"));
};
