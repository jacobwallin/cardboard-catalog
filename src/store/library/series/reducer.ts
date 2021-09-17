import {
  SeriesActionTypes,
  SeriesState,
  GET_SERIES_SUCCESS,
  UPDATE_SERIES_SUCCESS,
} from "./types";

const initialState = {
  series: {
    id: 0,
    name: "",
    color: "string",
    serialized: null,
    auto: false,
    relic: false,
    manufacturedRelic: false,
    parallel: false,
    shortPrint: false,
    createdAt: "",
    updatedAt: "",
    subsetId: 0,
    cards: [],
  },
};

export default function seriesReducer(
  state: SeriesState = initialState,
  action: SeriesActionTypes
) {
  switch (action.type) {
    case GET_SERIES_SUCCESS:
      return { ...state, series: action.series };
    case UPDATE_SERIES_SUCCESS:
      return { ...state, series: action.updatedSeries };
    default:
      return state;
  }
}
