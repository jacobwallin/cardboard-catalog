import { FilterCollectionActions, FilterCollectionState, GET_CARDS_SUCCESS } from "./types";

import { CLEAR_COLLECTION, ClearCollectionAction } from "../browse/types";

const initialState = {
  count: 0,
  rows: [],
};

export default function cardReducer(
  state: FilterCollectionState = initialState,
  action: FilterCollectionActions | ClearCollectionAction
) {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return action.payload;
    case CLEAR_COLLECTION:
      return initialState;
    default:
      return state;
  }
}
