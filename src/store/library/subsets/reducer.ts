import {
  LibraryState,
  LibraryActionTypes,
  GET_SUBSET_SUCCESS,
  UPDATE_SUBSET_SUCCESS,
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
    series: [],
    card_data: [],
  },
};

const subsetsReducer = (
  state = initialState,
  action: LibraryActionTypes
): LibraryState => {
  switch (action.type) {
    case GET_SUBSET_SUCCESS:
      return { ...state, subset: action.subset };
    case UPDATE_SUBSET_SUCCESS:
      return {
        ...state,
        subset: { ...state.subset, ...action.updatedSubset },
      };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default subsetsReducer;
