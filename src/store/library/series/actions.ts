import {
  GET_SERIES_REQUEST,
  GET_SERIES_SUCCESS,
  GET_SERIES_FAILURE,
  UPDATE_SERIES_REQUEST,
  UPDATE_SERIES_SUCCESS,
  UPDATE_SERIES_FAILURE,
  SeriesActionTypes,
  Series,
} from "./types";

export const getSeriesRequest = (): SeriesActionTypes => ({
  type: GET_SERIES_REQUEST,
});
export const getSeriesSuccess = (series: Series): SeriesActionTypes => ({
  type: GET_SERIES_SUCCESS,
  series,
});
export const getSeriesFailure = (): SeriesActionTypes => ({
  type: GET_SERIES_FAILURE,
});

export const updateSeriesRequest = (): SeriesActionTypes => ({
  type: UPDATE_SERIES_REQUEST,
});
export const updateSeriesSuccess = (
  updatedSeries: Series
): SeriesActionTypes => ({
  type: UPDATE_SERIES_SUCCESS,
  updatedSeries,
});
export const updateSeriesFailure = (): SeriesActionTypes => ({
  type: UPDATE_SERIES_FAILURE,
});
