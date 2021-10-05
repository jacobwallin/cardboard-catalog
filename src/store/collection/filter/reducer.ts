import {
  FilterCollectionActions,
  FilterCollectionState,
  GET_CARDS_SUCCESS,
} from "./types";

import { RemoveUser, REMOVE_USER } from "../../user/types";
import { CLEAR_COLLECTION, ClearCollectionAction } from "../browse/types";

const initialState = {
  count: 0,
  rows: [],
};

export default function cardReducer(
  state: FilterCollectionState = initialState,
  action: FilterCollectionActions | RemoveUser | ClearCollectionAction
) {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return action.payload;
    case REMOVE_USER:
      return initialState;
    case CLEAR_COLLECTION:
      return initialState;
    default:
      return state;
  }
}
