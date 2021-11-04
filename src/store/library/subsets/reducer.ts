import * as types from "./types";

const initialState: types.LibraryState = {
  subset: {
    id: 0,
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "string",
    setId: 0,
    baseSeriesId: 0,
    set: {
      id: 0,
      name: "",
      release_date: "",
      baseSubsetId: null,
      createdAt: "",
      updatedAt: "",
      leagueId: 0,
      brandId: 0,
    },
    series: [],
    card_data: [],
  },
};

const subsetsReducer = (
  state = initialState,
  action: types.SubsetActionTypes
): types.LibraryState => {
  switch (action.type) {
    case types.GET_SUBSET_SUCCESS:
      return { ...state, subset: action.subset };
    case types.UPDATE_SUBSET_SUCCESS:
      return {
        ...state,
        subset: { ...state.subset, ...action.updatedSubset },
      };
    case types.CREATE_SERIES_SUCCESS:
      return {
        ...state,
        subset: {
          ...state.subset,
          series: [...state.subset.series, action.series],
        },
      };
    case types.CREATE_CARD_SUCCESS:
      return {
        ...state,
        subset: {
          ...state.subset,
          card_data: [...state.subset.card_data, action.card],
        },
      };
    case types.BULK_CREATE_CARD_SUCCESS:
      return {
        ...state,
        subset: {
          ...state.subset,
          card_data: [...state.subset.card_data, ...action.cards],
        },
      };
    case types.UPDATE_CARD_SUCCESS:
      return {
        subset: {
          ...state.subset,
          card_data: state.subset.card_data.map((cardData) => {
            if (cardData.id === action.updatedCard.id) {
              return action.updatedCard;
            }
            return cardData;
          }),
        },
      };
    case types.DELETE_CARD_SUCCESS:
      return {
        subset: {
          ...state.subset,
          card_data: state.subset.card_data.filter(
            (cardData) => cardData.id !== action.cardDataId
          ),
        },
      };
    case types.DELETE_ALL_CARDS_SUCCESS:
      return {
        subset: {
          ...state.subset,
          card_data: [],
        },
      };
    case types.CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
