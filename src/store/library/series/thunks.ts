import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { SeriesActionTypes } from "./types";

export const fetchSeriesById =
  (
    seriesId: number
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSeriesRequest());
    fetch(`/api/series/${seriesId}`)
      .then((response) => {
        return response.json();
      })
      .then((series) => {
        dispatch(actions.getSeriesSuccess(series));
      })
      .catch((error) => dispatch(actions.getSeriesFailure()));
  };

export const updateSeries =
  (
    seriesId: number,
    seriesData: {
      name: string;
      serialized: number | null;
      color: string;
      auto: boolean;
      relic: boolean;
      manufacturedRelic: boolean;
      parallel: boolean;
      shortPrint: boolean;
    }
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSeriesRequest());
    fetch(`/api/series/${seriesId}`, {
      method: "PUT",
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
      .then((updatedSeries) => {
        dispatch(actions.updateSeriesSuccess(updatedSeries));
      })
      .catch((error) => {
        dispatch(actions.updateSeriesFailure());
      });
  };
