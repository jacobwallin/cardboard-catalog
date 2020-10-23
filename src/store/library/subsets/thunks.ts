import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getSubset } from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchSubset = (
  subsetId: number
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  fetch(`/api/subsets/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSubset(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};
