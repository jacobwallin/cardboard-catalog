import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { SetsActionTypes } from "./types";

export const fetchAllSetData =
  (): ThunkAction<void, RootState, unknown, SetsActionTypes> => (dispatch) => {
    dispatch(actions.getAllSetsRequest());
    fetch(`/api/sets`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(actions.getAllSetsSuccess(data));
      })
      .catch((err) => console.log("ERROR IN FETCH ALL SETS LIBRARY THUNK"));
  };

export const fetchSet =
  (setId: number): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSingleSetRequest());
    fetch(`/api/sets/${setId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(actions.getSingleSetSuccess(data));
      })
      .catch((err) => actions.getAllSetsFailure());
  };

export const createSet =
  (
    setId: number,
    setData: {
      name: string;
      year: number;
      description: string;
      leagueId: number;
      brandId: number;
    }
  ): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSetRequest());

    fetch(`/api/sets/${setId}`, {
      method: "POST",
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
        dispatch(actions.createSetSuccess(updatedSet));
      })
      .catch((error) => {
        dispatch(actions.createSetFailure());
      });
  };

export const updateSet =
  (
    setId: number,
    setData: {
      name: string;
      year: number;
      description: string;
      leagueId: number;
      brandId: number;
    }
  ): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSetRequest());

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
        dispatch(actions.updateSetSuccess(updatedSet));
      })
      .catch((error) => {
        dispatch(actions.updateSetFailure());
      });
  };

export const deleteSet =
  (setId: number): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteSetRequest());

    fetch(`/api/sets/${setId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((deleteStatus) => {
        dispatch(actions.deleteSetSuccess(setId));
      })
      .catch((error) => console.log(error.message));
  };

export const createSubset =
  (subsetData: {
    name: string;
    description: string;
    setId: number;
  }): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSubsetRequest());

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
          actions.createSubsetSuccess({
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
