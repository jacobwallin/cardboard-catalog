import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import {
  getAllSetsRequest,
  getAllSetsSuccess,
  getSingleSetRequest,
  getSingleSetSuccess,
  updateSetRequest,
  updateSetSuccess,
  deleteSetRequest,
  deleteSetSuccess,
  createSubsetRequest,
  createSubsetSuccess,
} from "./actions";
import { SetsActionTypes } from "./types";
import { postData } from "../../../utils/postData";
import { response } from "express";

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

export const deleteSet = (
  setId: number
): ThunkAction<void, RootState, unknown, SetsActionTypes> => (dispatch) => {
  dispatch(deleteSetRequest());

  fetch(`/api/sets/${setId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((deleteStatus) => {
      dispatch(deleteSetSuccess(setId));
    })
    .catch((error) => console.log(error.message));
};

export const createSubset = (subsetData: {
  name: string;
  description: string;
  setId: number;
}): ThunkAction<void, RootState, unknown, SetsActionTypes> => (dispatch) => {
  dispatch(createSubsetRequest());

  fetch(`/api/subsets`, {
    method: "POST",
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
    .then((createdSubset) => {
      dispatch(
        createSubsetSuccess({
          id: createdSubset.id,
          name: createdSubset.name,
          description: createdSubset.description,
          cardQuantity: createdSubset.cardQuantity,
          setId: createdSubset.setId,
        })
      );
    })
    .catch((error) => {
      console.log(error.message);
    });
};
