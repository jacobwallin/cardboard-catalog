import {
  LibraryState,
  LibraryActionTypes,
  GET_SUBSET_SUCCESS,
  UPDATE_SUBSET_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

const initialState: LibraryState = {
  singleSubset: {
    id: 0,
    cardQuantity: 0,
    name: "",
    description: "",
    setId: 0,
    createdAt: "",
    updatedAt: "",
    series: [],
  },
};

const subsetsReducer = (
  state = initialState,
  action: LibraryActionTypes
): LibraryState => {
  switch (action.type) {
    case GET_SUBSET_SUCCESS:
      return { ...state, singleSubset: action.singleSubset };
    case UPDATE_SUBSET_SUCCESS:
      return {
        ...state,
        singleSubset: { ...state.singleSubset, ...action.updatedSubset },
      };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
