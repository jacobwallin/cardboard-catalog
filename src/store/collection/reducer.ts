import {
  CollectionState,
  CollectionActionTypes,
  GET_SUBSETS,
  GET_SINGLE_SUBSET,
  CLEAR_SINGLE_SUBSET,
  CLEAR_SUBSETS,
} from "./types";

const initialState: CollectionState = {
  subsets: [],
  singleSubset: [],
};

export default function collectionReducer(
  state = initialState,
  action: CollectionActionTypes
): CollectionState {
  switch (action.type) {
    case GET_SUBSETS:
      return { ...state, subsets: action.subsets };
    case CLEAR_SUBSETS:
      return { ...state, subsets: initialState.subsets };
    case GET_SINGLE_SUBSET:
      return { ...state, singleSubset: action.singleSubset };
    case CLEAR_SINGLE_SUBSET:
      return { ...state, singleSubset: initialState.singleSubset };
    default:
      return state;
  }
}
