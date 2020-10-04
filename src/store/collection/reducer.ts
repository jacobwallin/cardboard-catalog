import {
  CollectionState,
  CollectionActionTypes,
  GET_CARDS_BY_SET,
  GET_CARDS_BY_SUBSET,
  GET_CARDS_IN_SINGLE_SUBSET,
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
    case GET_CARDS_BY_SET:
      return { ...state, cardsBySet: action.cardsBySet };
    case GET_CARDS_BY_SUBSET:
      return { ...state, cardsBySubset: action.cardsBySubset };
    case GET_CARDS_IN_SINGLE_SUBSET:
      return { ...state, cardsInSingleSubset: action.singleSubsetCards };
    case CLEAR_COLLECTION:
      return initialState;
    default:
      return state;
  }
}
