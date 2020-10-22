import {
  LibraryState,
  LibraryActionTypes,
  GET_ALL_SETS,
  GET_SET,
  CLEAR_LIBRARY,
} from "./types";

const initialState: LibraryState = {
  allSets: [],
  singleSet: {
    id: 0,
    name: "",
    year: 0,
    description: "",
    createdAt: "",
    updatedAt: "",
    league: {
      id: 0,
      name: "",
    },
    brand: {
      id: 0,
      name: "",
    },
    subsets: [],
  },
};

const setsReducer = (
  state = initialState,
  action: LibraryActionTypes
): LibraryState => {
  switch (action.type) {
    case GET_SET:
      return { ...state, singleSet: action.singleSet };
    case GET_ALL_SETS:
      return { ...state, allSets: action.allSets };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default setsReducer;
