import * as types from "./types";

export const getSubsetSuccess = (
  subset: types.Subset
): types.SubsetActionTypes => ({
  type: types.GET_SUBSET_SUCCESS,
  subset,
});
export const getSubsetRequest = (): types.SubsetActionTypes => ({
  type: types.GET_SUBSET_REQUEST,
});
export const getSubsetFailure = (): types.SubsetActionTypes => ({
  type: types.GET_SUBSET_FAILURE,
});

export const updateSubsetRequest = (): types.SubsetActionTypes => ({
  type: types.UPDATE_SUBSET_REQUEST,
});

export const updateSubsetSuccess = (
  updatedSubset: types.UpdatedSubset
): types.SubsetActionTypes => ({
  type: types.UPDATE_SUBSET_SUCCESS,
  updatedSubset,
});
export const updateSubsetFailure = (): types.SubsetActionTypes => ({
  type: types.UPDATE_SUBSET_FAILURE,
});

export const deleteSubsetRequest = (): types.SubsetActionTypes => ({
  type: types.DELETE_SUBSET_REQUEST,
});
export const deleteSubsetSuccess = (): types.SubsetActionTypes => ({
  type: types.DELETE_SUBSET_SUCCESS,
});
export const deleteSubsetFailure = (): types.SubsetActionTypes => ({
  type: types.DELETE_SUBSET_FAILURE,
});

export const clearLibrary = () => ({
  type: types.CLEAR_LIBRARY,
});

export const createSeriesRequest = (): types.SubsetActionTypes => ({
  type: types.CREATE_SERIES_REQUEST,
});
export const createSeriesSuccess = (
  series: types.SubsetSeries
): types.SubsetActionTypes => ({
  type: types.CREATE_SERIES_SUCCESS,
  series,
});
export const createSeriesFaillure = (): types.SubsetActionTypes => ({
  type: types.CREATE_SERIES_FAILURE,
});

export const createCardRequest = (): types.SubsetActionTypes => ({
  type: types.CREATE_CARD_REQUEST,
});
export const createCardSuccess = (
  card: types.CardData
): types.SubsetActionTypes => ({
  type: types.CREATE_CARD_SUCCESS,
  card,
});
export const createCardFailure = (): types.SubsetActionTypes => ({
  type: types.CREATE_CARD_FAILURE,
});

export const bulkCreateCardRequest = (): types.SubsetActionTypes => ({
  type: types.BULK_CREATE_CARD_REQUEST,
});
export const bulkCreateCardSuccess = (
  cards: types.CardData[]
): types.SubsetActionTypes => ({
  type: types.BULK_CREATE_CARD_SUCCESS,
  cards,
});
export const bulkCreateCardFailure = (): types.SubsetActionTypes => ({
  type: types.BULK_CREATE_CARD_FAILURE,
});

export const updateCardRequest = (): types.SubsetActionTypes => ({
  type: types.UPDATE_CARD_REQUEST,
});

export const updateCardSuccess = (
  updatedCard: types.CardData
): types.SubsetActionTypes => ({
  type: types.UPDATE_CARD_SUCCESS,
  updatedCard,
});
export const updateCardFailure = (): types.SubsetActionTypes => ({
  type: types.UPDATE_CARD_FAILURE,
});

export const deleteCardsRequest = (): types.SubsetActionTypes => ({
  type: types.DELETE_CARDS_REQUEST,
});
export const deleteCardsSuccess = (
  cardDataIds: number[]
): types.SubsetActionTypes => ({
  type: types.DELETE_CARDS_SUCCESS,
  cardDataIds,
});
export const deleteCardsFailure = (): types.SubsetActionTypes => ({
  type: types.DELETE_CARDS_FAILURE,
});
