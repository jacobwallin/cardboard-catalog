import { FilterCollectionActions, FilterCollectionState, GET_CARDS_SUCCESS } from "./types";

import { ADD_CARDS_SUCCESS, AddCardsSuccess } from "../browse/types";

const initialState = {
  count: 0,
  rows: [],
  dataFetched: false,
};

export default function cardReducer(
  state: FilterCollectionState = initialState,
  action: FilterCollectionActions | AddCardsSuccess
) {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return {
        dataFetched: true,
        count: action.payload.count,
        rows: action.payload.rows,
      };
    case ADD_CARDS_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
