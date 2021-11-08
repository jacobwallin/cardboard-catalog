import * as types from "./types";

const initialState: types.SeriesState = {
  series: {
    id: 0,
    name: "",
    color: "string",
    serialized: null,
    auto: false,
    relic: false,
    manufacturedRelic: false,
    parallel: false,
    refractor: false,
    shortPrint: false,
    createdAt: "",
    updatedAt: "",
    createdBy: 0,
    updatedBy: 0,
    subsetId: 0,
    subset: {
      id: 0,
      name: "",
      description: "",
      baseSeriesId: 0,
      createdAt: "",
      updatedAt: "",
      createdBy: 0,
      updatedBy: 0,
      setId: 0,
      set: {
        id: 0,
        name: "",
        description: "",
        year: 0,
        release_date: "",
        complete: false,
        createdAt: "",
        updatedAt: "",
        createdBy: 0,
        updatedBy: 0,
        baseSubsetId: 0,
        leagueId: 0,
        brandId: 0,
      },
    },
    cards: [],
  },
};

export default function seriesReducer(
  state: types.SeriesState = initialState,
  action: types.SeriesActionTypes
): types.SeriesState {
  switch (action.type) {
    case types.GET_SERIES_SUCCESS:
      return { ...state, series: action.series };
    case types.UPDATE_SERIES_SUCCESS:
      return {
        ...state,
        series: {
          ...action.updatedSeries,
          subset: {
            ...action.updatedSeries.subset,
            set: {
              ...state.series.subset.set,
            },
          },
          cards: state.series.cards,
        },
      };
    case types.DELETE_SERIES_SUCCESS:
      return initialState;
    case types.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        series: {
          ...state.series,
          cards: state.series.cards.map((card) => {
            if (card.id === action.updatedCard.id) {
              return {
                ...card,
                serializedTo: action.updatedCard.serializedTo,
              };
            }
            return card;
          }),
        },
      };
    default:
      return state;
  }
}
