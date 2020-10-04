import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { getAllSets, getSet, getSubset } from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchAllSetData = (): ThunkAction<
  void,
  RootState,
  unknown,
  LibraryActionTypes
> => (dispatch) => {
  fetch(`/api/library/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getAllSets(data));
    })
    .catch((err) => console.log("ERROR IN FETCH ALL SETS LIBRARY THUNK"));
};

export const fetchSet = (
  setId: number
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  fetch(`/api/library/set/${setId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSet(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};

export const fetchSubset = (
  subsetId: number
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  fetch(`/api/library/subset/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSubset(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};
