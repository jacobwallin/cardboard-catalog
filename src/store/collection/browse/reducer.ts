import {
  CollectionState,
  CollectionActionTypes,
  GET_CARDS_BY_SET_SUCCESS,
  GET_CARDS_BY_SUBSET_SUCCESS,
  GET_CARDS_IN_SINGLE_SUBSET_SUCCESS,
  CLEAR_COLLECTION,
  SET_INITIAL_DATA_LOAD,
  ADD_CARDS_SUCCESS,
  DELETE_CARDS_SUCCESS,
  QUICK_ADD_SUCCESS,
} from "./types";

import { RemoveUser, REMOVE_USER } from "../../user/types";

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
      // if subsetId matches (this means cards were added from subset page and not quick add), append cards
      if (state.cardsInSingleSubset.subsetId === action.subsetId) {
        return {
          ...initialState,
          cardsInSingleSubset: {
            cards: [...state.cardsInSingleSubset.cards, ...action.newCards],
            subsetId: state.cardsInSingleSubset.subsetId,
          },
        };
      }
      return initialState;
    case QUICK_ADD_SUCCESS:
      // clear state when user adds cards from quick add form since collection will have to be re-fetched
      return initialState;
    case DELETE_CARDS_SUCCESS:
      return {
        ...initialState,
        cardsInSingleSubset: {
          subsetId: state.cardsInSingleSubset.subsetId,
          cards: state.cardsInSingleSubset.cards.filter(
            (userCard) => !action.userCardIds.some((id) => id === userCard.id)
          ),
        },
      };
    // collection clears when user logs out
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
