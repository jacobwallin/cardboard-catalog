import { ThunkAction } from "redux-thunk";
import { postData } from "../../../utils/postData";
import { RootState } from "../../index";
import {
  getSubsetRequest,
  getSubsetSuccess,
  updateSubsetRequest,
  updateSubsetSuccess,
} from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchSubset = (
  subsetId: number
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  dispatch(getSubsetRequest());
  fetch(`/api/subsets/${subsetId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSubsetSuccess(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};

export const updateSubset = (
  subsetId: number,
  subsetData: {
    name: string;
    cardQuantity: number;
    description: string;
  }
): ThunkAction<void, RootState, unknown, LibraryActionTypes> => (dispatch) => {
  dispatch(updateSubsetRequest());
  fetch(`/api/subsets/${subsetId}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(subsetData),
  })
    .then((response) => {
      return response.json();
    })
    .then((updatedSet) => {
      dispatch(updateSubsetSuccess(updatedSet));
    })
    .catch((error) => {
      console.log("ERROR IN UPDATE SUBSET THUNK");
    });
};
