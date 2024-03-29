import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { SeriesActionTypes, UpdateCardResponse, Card } from "./types";
import { get, put, del, post } from "../../../utils/fetch";

export const fetchSeriesById =
  (
    seriesId: number
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSeriesRequest());
    get(`/api/series/${seriesId}`, dispatch)
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
      auto: boolean;
      relic: boolean;
      manufacturedRelic: boolean;
      refractor: boolean;
      shortPrint: boolean;
    }
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSeriesRequest());
    put(`/api/series/${seriesId}`, seriesData, dispatch)
      .then((updatedSeries) => {
        dispatch(actions.updateSeriesSuccess(updatedSeries));
      })
      .catch((error) => {
        dispatch(actions.updateSeriesFailure());
      });
  };

export const deleteSeries =
  (
    seriesId: number
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteSeriesRequest());
    del(`/api/series/${seriesId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteSeriesSuccess());
      })
      .catch((error) => dispatch(actions.deleteSeriesSuccess()));
  };

export const updateCard =
  (
    cardId: number,
    cardData: {
      serializedTo: number | null;
    }
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateCardRequest());

    put(`/api/cards/${cardId}`, cardData, dispatch)
      .then((updatedCard: UpdateCardResponse) => {
        dispatch(actions.updateCardSuccess(updatedCard));
      })
      .catch((error) => dispatch(actions.updateCardFailure()));
  };

export const deleteCards =
  (
    cardIds: number[]
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteCardsRequest());

    post(`/api/cards/delete`, { cardIds }, dispatch)
      .then((deleteResponse) => {
        dispatch(actions.deleteCardsSuccess(cardIds));
      })
      .catch((error) => {
        dispatch(actions.deleteCardsFailure());
      });
  };

export const addCards =
  (
    cardDataIds: number[],
    seriesId: number
  ): ThunkAction<void, RootState, unknown, SeriesActionTypes> =>
  (dispatch) => {
    dispatch(actions.addCardsRequest());

    post(`/api/cards/`, { cardDataIds, seriesId }, dispatch)
      .then((newCards: Card[]) => {
        dispatch(actions.addCardsSuccess(newCards));
      })
      .catch((error) => dispatch(actions.addCardsFailure()));
  };
