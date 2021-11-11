import * as types from "./types";

import { ADD_CARDS_SUCCESS, AddCardsSuccess } from "../browse/types";

const initialState: types.FilterCollectionState = {
  count: 0,
  rows: [],
  pdfData: [],
  dataFetched: false,
};

export default function cardReducer(
  state: types.FilterCollectionState = initialState,
  action: types.FilterCollectionActions | AddCardsSuccess
): types.FilterCollectionState {
  switch (action.type) {
    case types.GET_CARDS_SUCCESS:
      return {
        dataFetched: true,
        count: action.payload.count,
        rows: action.payload.rows,
        pdfData: [],
      };
    case ADD_CARDS_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
