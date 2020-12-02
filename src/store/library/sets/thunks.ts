import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import {
  getAllSetsRequest,
  getAllSetsSuccess,
  getSingleSetRequest,
  getSingleSetSuccess,
  updateSetRequest,
  updateSetSuccess,
} from "./actions";
import { SetsActionTypes } from "./types";
import { postData } from "../../../utils/postData";

export const fetchAllSetData = (): ThunkAction<
  void,
  RootState,
  unknown,
  SetsActionTypes
> => (dispatch) => {
  dispatch(getAllSetsRequest());
  fetch(`/api/sets`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getAllSetsSuccess(data));
    })
    .catch((err) => console.log("ERROR IN FETCH ALL SETS LIBRARY THUNK"));
};

export const fetchSet = (
  setId: number
): ThunkAction<void, RootState, unknown, SetsActionTypes> => (dispatch) => {
  dispatch(getSingleSetRequest());
  fetch(`/api/sets/${setId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(getSingleSetSuccess(data));
    })
    .catch((err) => console.log("ERROR IN FETCH SUBSET LIBRARY THUNK"));
};

export const updateSet = (
  setId: number,
  setData: {
    name: string;
    year: number;
    description: string;
    leagueId: number;
    brandId: number;
  }
): ThunkAction<void, RootState, unknown, SetsActionTypes> => (dispatch) => {
  dispatch(updateSetRequest());

  fetch(`/api/sets/${setId}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(setData),
  })
    .then((response) => {
      return response.json();
    })
    .then((updatedSet) => {
      dispatch(updateSetSuccess(updatedSet));
    })
    .catch((error) => {
      console.log("ERROR IN UPDATE SET THUNK");
    });
};
