import {
  CollectionState,
  CollectionActionTypes,
  GET_CARDS_BY_SET_SUCCESS,
  GET_CARDS_BY_SUBSET_SUCCESS,
  GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  CLEAR_COLLECTION,
} from "./types";

const initialState: CollectionState = {
  cardsBySet: [],
  cardsBySubset: [],
  cardsInSingleSubset: [],
};

export default function collectionReducer(
  state = initialState,
  action: CollectionActionTypes
): CollectionState {
  switch (action.type) {
    case GET_CARDS_BY_SET_SUCCESS:
      return { ...state, cardsBySet: action.cardsBySet };
    case GET_CARDS_BY_SUBSET_SUCCESS:
      return { ...state, cardsBySubset: action.cardsBySubset };
    case GET_CARDS_IN_SINGLE_SUBSET_SUCCESS:
      return { ...state, cardsInSingleSubset: action.singleSubsetCards };
    case CLEAR_COLLECTION:
      return initialState;
    default:
      return state;
  }
}
