import {
  FilterCollectionActions,
  FilterCollectionState,
  GET_CARDS_SUCCESS,
} from "./types";

const initialState = {
  count: 0,
  rows: [],
};

export default function cardReducer(
  state: FilterCollectionState = initialState,
  action: FilterCollectionActions
) {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
