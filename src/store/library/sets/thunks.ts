import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import * as types from "./types";
import { PostSubsetData } from "../subsets/types";
import { SetsActionTypes } from "./types";
import { get, post, put, del } from "../../../utils/fetch";
import { SubsetInstance } from "../subsets/types";

export const fetchAllSetData =
  (query: string): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.getAllSetsRequest());

    get(`/api/sets?${query}`, dispatch)
      .then((data) => {
        dispatch(actions.getAllSetsSuccess(data));
      })
      .catch((err) => dispatch(actions.getAllSetsFailure()));
  };

export const fetchSetYears =
  (sportId?: number): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.getAllSetYearsRequest());

    get(
      sportId ? `/api/sets/years?sportId=${sportId}` : `/api/sets/years`,
      dispatch
    )
      .then((data) => {
        dispatch(actions.getAllSetYearsSuccess(data));
      })
      .catch((err) => dispatch(actions.getAllSetYearsFailure()));
  };

export const fetchSet =
  (setId: number): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSingleSetRequest());
    get(`/api/sets/${setId}`, dispatch)
      .then((data) => {
        dispatch(actions.getSingleSetSuccess(data));
      })
      .catch((err) => dispatch(actions.getAllSetsFailure()));
  };

export const createSet =
  (setData: {
    name: string;
    release_date: string | null;
    year: number;
    description: string;
    leagueId: number;
    brandId: number;
  }): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSetRequest());
    post(`/api/sets`, setData, dispatch)
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
      release_date: string | null;
      year: number;
      complete: boolean;
      description: string;
      leagueId: number;
      brandId: number;
    }
  ): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSetRequest());
    put(`/api/sets/${setId}`, setData, dispatch)
      .then((updatedSet: types.UpdatedSet) => {
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
    del(`/api/sets/${setId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteSetSuccess(setId));
      })
      .catch((error) => dispatch(actions.deleteSetFailure()));
  };

export const createSubset =
  (
    subsetData: PostSubsetData
  ): ThunkAction<void, RootState, unknown, SetsActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSubsetRequest());
    post(`/api/subsets`, subsetData, dispatch)
      .then((createdSubset: SubsetInstance) => {
        dispatch(actions.createSubsetSuccess(createdSubset));
      })
      .catch((error) => {
        dispatch(actions.createSubsetFailure());
      });
  };
