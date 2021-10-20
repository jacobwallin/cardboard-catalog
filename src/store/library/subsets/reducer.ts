import {
  LibraryState,
  SubsetActionTypes,
  GET_SUBSET_SUCCESS,
  UPDATE_SUBSET_SUCCESS,
  CREATE_SERIES_SUCCESS,
  CREATE_CARD_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

const initialState: LibraryState = {
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
  action: SubsetActionTypes
): LibraryState => {
  switch (action.type) {
    case GET_SUBSET_SUCCESS:
      return { ...state, subset: action.subset };
    case UPDATE_SUBSET_SUCCESS:
      return {
        ...state,
        subset: { ...state.subset, ...action.updatedSubset },
      };
    case CREATE_SERIES_SUCCESS:
      return {
        ...state,
        subset: {
          ...state.subset,
          series: [...state.subset.series, action.series],
        },
      };
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        subset: {
          ...state.subset,
          card_data: [...state.subset.card_data, action.card],
        },
      };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
