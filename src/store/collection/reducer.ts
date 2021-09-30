import {
  CollectionState,
  CollectionActionTypes,
  GET_CARDS_BY_SET_SUCCESS,
  GET_CARDS_BY_SUBSET_SUCCESS,
  GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  CLEAR_COLLECTION,
  SET_INITIAL_DATA_LOAD,
  ADD_CARDS_SUCCESS,
} from "./types";

import { RemoveUser, REMOVE_USER } from "../user/types";

const initialState: CollectionState = {
  cardsBySet: [],
  cardsBySubset: {
    subsets: [],
    setId: 0,
  },
  cardsInSingleSubset: {
    cards: [],
    subsetId: 0,
  },
  initialDataLoadComplete: false,
};

export default function collectionReducer(
  state = initialState,
  action: CollectionActionTypes | RemoveUser
): CollectionState {
  switch (action.type) {
    case GET_CARDS_BY_SET_SUCCESS:
      return { ...state, cardsBySet: action.cardsBySet };
    case GET_CARDS_BY_SUBSET_SUCCESS:
      return {
        ...state,
        cardsBySubset: { subsets: action.cardsBySubset, setId: action.setId },
      };
    case GET_CARDS_IN_SINGLE_SUBSET_SUCCESS:
      return {
        ...state,
        cardsInSingleSubset: { cards: action.cards, subsetId: action.subsetId },
      };
    case SET_INITIAL_DATA_LOAD:
      return {
        ...state,
        initialDataLoadComplete: action.status,
      };
    case CLEAR_COLLECTION:
      return initialState;
    case ADD_CARDS_SUCCESS:
      return initialState;
    // collection clears when user logs out
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
