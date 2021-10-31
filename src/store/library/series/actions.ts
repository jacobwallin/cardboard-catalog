import * as types from "./types";

export const getSeriesRequest = (): types.SeriesActionTypes => ({
  type: types.GET_SERIES_REQUEST,
});
export const getSeriesSuccess = (
  series: types.Series
): types.SeriesActionTypes => ({
  type: types.GET_SERIES_SUCCESS,
  series,
});
export const getSeriesFailure = (): types.SeriesActionTypes => ({
  type: types.GET_SERIES_FAILURE,
});

export const updateSeriesRequest = (): types.SeriesActionTypes => ({
  type: types.UPDATE_SERIES_REQUEST,
});
export const updateSeriesSuccess = (
  updatedSeries: types.Series
): types.SeriesActionTypes => ({
  type: types.UPDATE_SERIES_SUCCESS,
  updatedSeries,
});
export const updateSeriesFailure = (): types.SeriesActionTypes => ({
  type: types.UPDATE_SERIES_FAILURE,
});

export const deleteSeriesRequest = (): types.SeriesActionTypes => ({
  type: types.DELETE_SERIES_REQUEST,
});
export const deleteSeriesSuccess = (): types.SeriesActionTypes => ({
  type: types.DELETE_SERIES_SUCCESS,
});
export const deleteSeriesFailure = (): types.SeriesActionTypes => ({
  type: types.DELETE_SERIES_FAILURE,
});

export const updateCardRequest = (): types.SeriesActionTypes => ({
  type: types.UPDATE_CARD_REQUEST,
});
export const updateCardSuccess = (
  updatedCard: types.UpdateCardResponse
): types.SeriesActionTypes => ({
  type: types.UPDATE_CARD_SUCCESS,
  updatedCard,
});
export const updateCardFailure = (): types.SeriesActionTypes => ({
  type: types.UPDATE_CARD_FAILURE,
});
