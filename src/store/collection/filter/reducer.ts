import * as types from "./types";

import {
  ADD_TRANSACTION_SUCCESS,
  AddTransactionSuccess,
} from "../transactions/types";

const initialState: types.FilterCollectionState = {
  count: 0,
  rows: [],
  pdfData: [],
  dataFetched: false,
};

export default function cardReducer(
  state: types.FilterCollectionState = initialState,
  action: types.FilterCollectionActions | AddTransactionSuccess
): types.FilterCollectionState {
  switch (action.type) {
    case types.GET_CARDS_SUCCESS:
      return {
        dataFetched: true,
        count: action.payload.count,
        rows: action.payload.rows,
        pdfData: [],
      };
    case types.GET_PDF_CARDS_SUCCESS:
      return {
        ...state,
        pdfData: action.payload.rows,
      };
    case ADD_TRANSACTION_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
