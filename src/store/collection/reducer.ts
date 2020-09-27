import {
  CollectionState,
  CollectionActionTypes,
  GET_SUBSETS,
  GET_SINGLE_SUBSET,
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
    case GET_SINGLE_SUBSET:
      return { ...state, singleSubset: action.singleSubset };
    default:
      return state;
  }
}
