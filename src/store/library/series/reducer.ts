import {
  SeriesActionTypes,
  SeriesState,
  GET_SERIES_BY_ID_SUCCESS,
  UPDATE_SERIES_SUCCESS,
} from "./types";

const initialState = {
  series: {
    id: 0,
    name: "",
    color: "",
    serializedTo: 0,
    createdAt: "",
    updatedAt: "",
    subsetId: 0,
    attributes: [],
  },
};

export default function seriesReducer(
  state: SeriesState = initialState,
  action: SeriesActionTypes
) {
  switch (action.type) {
    case GET_SERIES_BY_ID_SUCCESS:
      return { ...state, series: action.series };
    case UPDATE_SERIES_SUCCESS:
      return { ...state, series: action.updatedSeries };
    default:
      return state;
  }
}
