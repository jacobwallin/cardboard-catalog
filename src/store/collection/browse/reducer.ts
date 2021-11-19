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
    case types.ADD_CARDS_SUCCESS:
      // if subsetId matches (this means cards were added from subset page and not quick add), append cards
      if (state.cardsInSingleSubset.subsetId === action.subsetId) {
        const cardAdded = action.newCards.map((card) => {
          const cardData = action.cardData.find(
            (cd) => cd.card.id === card.cardId
          )!;
          return {
            ...card,
            card: {
              ...cardData.card,
            },
          };
        });
        return {
          ...initialState,
          cardsInSingleSubset: {
            cards: [...state.cardsInSingleSubset.cards, ...cardAdded],
            subsetId: state.cardsInSingleSubset.subsetId,
          },
        };
      }
      return initialState;
    case types.DELETE_CARDS_SUCCESS:
      return {
        ...initialState,
        cardsInSingleSubset: {
          subsetId: state.cardsInSingleSubset.subsetId,
          cards: state.cardsInSingleSubset.cards.filter(
            (userCard) => !action.userCardIds.some((id) => id === userCard.id)
          ),
        },
      };
    default:
      return state;
  }
}
