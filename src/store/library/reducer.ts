import {
  LibraryState,
  LibraryActionTypes,
  GET_SUBSET,
  GET_ALL_SETS,
} from "./types";

const initialState: LibraryState = {
  subset: {
    id: 0,
    cardQuantity: 0,
    name: "",
    setId: 0,
    createdAt: "",
    updatedAt: "",
    series: [],
    set: {
      id: 0,
      name: "",
      year: 0,
      brand: {
        id: 0,
        name: "",
      },
      league: {
        id: 0,
        name: "",
      },
    },
  },
  allSets: [],
};

const libraryReducer = (
  state = initialState,
  action: LibraryActionTypes
): LibraryState => {
  switch (action.type) {
    case GET_SUBSET:
      return { ...state, subset: action.subset };
    case GET_ALL_SETS:
      return { ...state, allSets: action.allSets };
    default:
      return state;
  }
};

export default libraryReducer;
