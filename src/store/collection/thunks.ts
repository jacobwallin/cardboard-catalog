import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { getSets, getSingleSet } from "./actions";
import { CollectionActionTypes } from "./types";

export const fetchSets = (): ThunkAction<
  void,
  RootState,
  unknown,
  CollectionActionTypes
> => (dispatch) => {
  fetch("/api/sets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSets(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SETS THUNK"));
};

export const fetchSingleSet = (
  setId: number
): ThunkAction<void, RootState, unknown, CollectionActionTypes> => (
  dispatch
) => {
  fetch(`/api/sets/${setId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSingleSet(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SINGLE SET THUNK"));
};
