import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getAllSets, getSet } from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchAllSetData = (): ThunkAction<
  void,
  RootState,
  unknown,
  LibraryActionTypes
> => (dispatch) => {
  fetch(`/api/sets`)
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
  fetch(`/api/sets/${setId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSet(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};
