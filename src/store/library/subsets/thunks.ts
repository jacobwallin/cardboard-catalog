import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { SubsetActionTypes } from "./types";
import { get, post, put, del } from "../../../utils/fetch";

export const fetchSubset =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSubsetRequest());
    get(`/api/subsets/${subsetId}`, dispatch)
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
    }
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateSubsetRequest());
    put(`/api/subsets/${subsetId}`, subsetData, dispatch)
      .then((updatedSet) => {
        dispatch(actions.updateSubsetSuccess(updatedSet));
      })
      .catch((error) => {
        actions.updateSubsetFailure();
      });
  };

export const deleteSubset =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteSubsetRequest());

    del(`/api/subsets/${subsetId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteSubsetSuccess());
      })
      .catch((error) => dispatch(actions.deleteSubsetFailure()));
  };

export const createSeries =
  (seriesData: {
    subsetId: number;
    name: string;
    serialized: number | null;
    refractor: boolean;
    shortPrint: boolean;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
  }): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.createSeriesRequest());
    post(`/api/series`, seriesData, dispatch)
      .then((createdSeries) => {
        dispatch(actions.createSeriesSuccess(createdSeries));
      })
      .catch((error) => {
        dispatch(actions.createSeriesFaillure());
      });
  };

export const createCard =
  (
    subsetId: number,
    cardData: {
      name: string;
      number: string;
      rookie: boolean;
      teamId: number | null;
      note: string;
      playerIds: number[];
    }
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.createCardRequest());
    post(`/api/carddata`, { ...cardData, subsetId }, dispatch)
      .then((createdCard) => {
        dispatch(actions.createCardSuccess(createdCard));
      })
      .catch((error) => {
        dispatch(actions.createCardFailure());
      });
  };

export const bulkCreateCard =
  (
    subsetId: number,
    cardData: {
      name: string;
      number: string;
      rookie: boolean;
      teamId: number | null;
      note: string;
      playerIds: number[];
    }[]
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.bulkCreateCardRequest());
    post(`/api/carddata/bulk`, { cards: cardData, subsetId }, dispatch)
      .then((createdCard) => {
        dispatch(actions.bulkCreateCardSuccess(createdCard));
      })
      .catch((error) => {
        dispatch(actions.bulkCreateCardFailure());
      });
  };

export const updateCard =
  (
    cardDataId: number,
    cardData: {
      name: string;
      number: string;
      rookie: boolean;
      teamId: number | undefined;
      note: string;
      playerIds: number[];
    }
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateCardRequest());
    put(`/api/carddata/${cardDataId}`, cardData, dispatch)
      .then((updatedCard) => {
        dispatch(actions.updateCardSuccess(updatedCard));
      })
      .catch((error) => {
        dispatch(actions.updateCardFailure());
      });
  };

export const deleteCard =
  (
    cardDataId: number
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteCardRequest());
    del(`/api/carddata/${cardDataId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteCardSuccess(cardDataId));
      })
      .catch((error) => dispatch(actions.deleteCardFailure()));
  };

export const deleteAllCards =
  (
    subsetId: number
  ): ThunkAction<void, RootState, unknown, SubsetActionTypes> =>
  (dispatch) => {
    dispatch(actions.deleteAllCardsRequest());
    del(`/api/carddata/subset/${subsetId}`, dispatch)
      .then((deleteStatus) => {
        dispatch(actions.deleteAllCardsSuccess());
      })
      .catch((error) => dispatch(actions.deleteAllCardsFailure()));
  };
