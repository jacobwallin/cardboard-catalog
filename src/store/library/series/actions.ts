import {
  GET_SERIES_BY_ID_REQUEST,
  GET_SERIES_BY_ID_SUCCESS,
  UPDATE_SERIES_REQUEST,
  UPDATE_SERIES_SUCCESS,
  SeriesActionTypes,
  Series,
} from "./types";

export const getSeriesByIdRequest = (): SeriesActionTypes => ({
  type: GET_SERIES_BY_ID_REQUEST,
});

export const getSeriesByIdSuccess = (series: Series): SeriesActionTypes => ({
  type: GET_SERIES_BY_ID_SUCCESS,
  series,
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
