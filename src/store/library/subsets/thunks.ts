import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { LibraryActionTypes } from "./types";

export const fetchSubset =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, LibraryActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSubsetRequest());
    fetch(`/api/subsets/${subsetId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(actions.getSubsetSuccess(data));
      })
      .catch((err) => actions.getSubsetFailure());
  };

export const updateSubset =
  (
    subsetId: number,
    subsetData: {
      name: string;
      description: string;
      baseSubsetId: number | null;
    }
  ): ThunkAction<void, RootState, unknown, LibraryActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSubsetRequest());
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
        dispatch(actions.updateSubsetSuccess(updatedSet));
      })
      .catch((error) => {
        actions.updateSubsetFailure();
      });
  };

export const createSeries =
  (seriesData: {
    subsetId: number;
    name: string;
    serialized: number | null;
    parallel: boolean;
    shortPrint: boolean;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
  }): ThunkAction<void, RootState, unknown, LibraryActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSeriesRequest());
    fetch(`/api/series`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(seriesData),
    })
      .then((response) => {
        return response.json();
      })
      .then((createdSeries) => {
        dispatch(actions.createSeriesSuccess(createdSeries));
      })
      .catch((error) => {
        dispatch(actions.createSeriesFaillure());
      });
  };
