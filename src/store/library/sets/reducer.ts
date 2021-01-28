import {
  SetsState,
  SetsActionTypes,
  GET_ALL_SETS_SUCCESS,
  GET_SINGLE_SET_SUCCESS,
  UPDATE_SET_SUCCESS,
  DELETE_SET_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

const initialState: SetsState = {
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
  action: SetsActionTypes
): SetsState => {
  switch (action.type) {
    case GET_SINGLE_SET_SUCCESS:
      return { ...state, singleSet: action.singleSet };
    case GET_ALL_SETS_SUCCESS:
      return { ...state, allSets: action.allSets };
    case UPDATE_SET_SUCCESS:
      /// update both the single set and all sets state to reflect updates to a set
      return {
        ...state,
        singleSet: { ...state.singleSet, ...action.updatedSet },
        allSets: state.allSets.map((set) => {
          if (set.id !== action.updatedSet.id) return set;
          return {
            id: action.updatedSet.id,
            name: action.updatedSet.name,
            year: action.updatedSet.year,
            brand: {
              id: action.updatedSet.brand.id,
              name: action.updatedSet.brand.name,
            },
            league: {
              id: action.updatedSet.league.id,
              name: action.updatedSet.league.name,
            },
          };
        }),
      };
    case DELETE_SET_SUCCESS:
      return {
        ...state,
        singleSet: initialState.singleSet,
        allSets: state.allSets.filter((set) => {
          return set.id !== action.setId;
        }),
      };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default setsReducer;
