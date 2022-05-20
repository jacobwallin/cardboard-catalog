import * as types from "./types";

const initialState: types.Subset = {
  id: 0,
  name: "",
  description: "",
  prefix: "",
  code: "",
  base: false,
  auto: false,
  relic: false,
  manufacturedRelic: false,
  shortPrint: false,
  createdAt: "",
  updatedAt: "",
  createdBy: 0,
  updatedBy: 0,
  setId: 0,
  baseSeriesId: 0,
  set: {
    id: 0,
    name: "",
    description: "",
    release_date: "",
    year: 0,
    complete: false,
    createdAt: "",
    updatedAt: "",
    createdBy: 0,
    updatedBy: 0,
    leagueId: 0,
    brandId: 0,
  },
  series: [],
  card_data: [],
  createdByUser: {
    username: "",
  },
  updatedByUser: {
    username: "",
  },
};

const subsetsReducer = (
  state = initialState,
  action: types.SubsetActionTypes
): types.Subset => {
  switch (action.type) {
    case types.GET_SUBSET_SUCCESS:
      return { ...action.subset };
    case types.UPDATE_SUBSET_SUCCESS:
      return {
        ...state,
        ...action.updatedSubset,
      };
    case types.CREATE_SERIES_SUCCESS:
      return {
        ...state,
        series: [...state.series, action.series],
      };
    case types.CREATE_CARD_SUCCESS:
      return {
        ...state,
        card_data: [...state.card_data, action.card],
      };
    case types.BULK_CREATE_CARD_SUCCESS:
      return {
        ...state,
        card_data: [...state.card_data, ...action.cards],
      };
    case types.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        card_data: state.card_data.map((cardData) => {
          if (cardData.id === action.updatedCard.id) {
            return action.updatedCard;
          }
          return cardData;
        }),
      };
    case types.DELETE_CARDS_SUCCESS:
      return {
        ...state,
        card_data: state.card_data.filter(
          (cardData) =>
            action.cardDataIds.findIndex((c) => c === cardData.id) === -1
        ),
      };
    case types.CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
