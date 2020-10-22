import {
  LibraryState,
  LibraryActionTypes,
  GET_SUBSET,
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
    case GET_SUBSET:
      return { ...state, singleSubset: action.singleSubset };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
