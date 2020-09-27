import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { getSubset, getAllSets } from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchSubsetData = (
  subsetId: number
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  fetch(`/api/library/subsets/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSubset(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};

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
