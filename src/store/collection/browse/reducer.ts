import * as types from "./types";

const initialState: types.CollectionState = {
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
  action: types.CollectionActionTypes
): types.CollectionState {
  switch (action.type) {
    case types.GET_CARDS_BY_SET_SUCCESS:
      return { ...state, cardsBySet: action.cardsBySet };
    case types.GET_CARDS_BY_SUBSET_SUCCESS:
      return {
        ...state,
        cardsBySubset: { subsets: action.cardsBySubset, setId: action.setId },
      };
    case types.GET_CARDS_IN_SINGLE_SUBSET_SUCCESS:
      return {
        ...state,
        cardsInSingleSubset: { cards: action.cards, subsetId: action.subsetId },
      };
    case types.SET_INITIAL_DATA_LOAD:
      return {
        ...state,
        initialDataLoadComplete: action.status,
      };
    default:
      return state;
  }
}
