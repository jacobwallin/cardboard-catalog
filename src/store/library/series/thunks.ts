import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import {
  getSeriesByIdRequest,
  getSeriesByIdSuccess,
  updateSeriesRequest,
  updateSeriesSuccess,
} from "./actions";
import { SeriesActionTypes } from "./types";

export const fetchSeriesById = (
  seriesId: number
): ThunkAction<void, RootState, unknown, SeriesActionTypes> => (dispatch) => {
  dispatch(getSeriesByIdRequest());
  fetch(`/api/series/${seriesId}`)
    .then((response) => {
      return response.json();
    })
    .then((series) => {
      dispatch(getSeriesByIdSuccess(series));
    })
    .catch((error) => console.log("ERROR FETCH SERIES BY ID"));
};

export const updateSeries = (
  seriesId: number,
  seriesData: {
    name: string;
    serializedTo: number | null;
    color: string;
    attributes: number[];
  }
): ThunkAction<void, RootState, unknown, SeriesActionTypes> => (dispatch) => {
  dispatch(updateSeriesRequest());
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
      dispatch(updateSeriesSuccess(updatedSeries));
    })
    .catch((error) => {
      console.log("ERROR IN UPDATE SET THUNK");
    });
};
