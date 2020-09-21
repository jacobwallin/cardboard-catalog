import {
  CollectionState,
  CollectionActionTypes,
  GET_SUBSETS,
  GET_SINGLE_SUBSET,
} from "./types";

const initialState: CollectionState = {
  subsets: [],
  singleSubset: {
    id: 0,
    name: "",
    year: 0,
    totalCards: 0,
    createdAt: "",
    updatedAt: "",
    BrandId: 0,
    Cards: [],
  },
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
