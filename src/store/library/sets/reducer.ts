import {
  SetsState,
  SetsActionTypes,
  GET_ALL_SETS_SUCCESS,
  GET_SINGLE_SET_SUCCESS,
  UPDATE_SET_SUCCESS,
  DELETE_SET_SUCCESS,
  CREATE_SUBSET_SUCCESS,
  CREATE_SET_SUCCESS,
  CLEAR_LIBRARY,
} from "./types";

const initialState: SetsState = {
  allSets: [],
  singleSet: {
    id: 0,
    name: "",
    year: 0,
    baseSubsetId: 0,
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
    case CREATE_SET_SUCCESS:
      return { ...state, allSets: [...state.allSets, action.set] };
    case UPDATE_SET_SUCCESS:
      /// update both the single set and all sets state to reflect updates to a set
      return {
        ...state,
        singleSet: { ...state.singleSet, ...action.updatedSet },
        allSets: state.allSets.map((set) => {
          if (set.id !== action.updatedSet.id) return set;
          return {
            ...set,
            id: action.updatedSet.id,
            name: action.updatedSet.name,
            year: action.updatedSet.year,
            description: action.updatedSet.description,
            baseSubsetId: action.updatedSet.baseSubsetId,
            leagueId: action.updatedSet.league.id,
            brandId: action.updatedSet.brand.id,
            league: action.updatedSet.league,
            brand: action.updatedSet.brand,
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
    case CREATE_SUBSET_SUCCESS:
      return {
        ...state,
        singleSet: {
          ...state.singleSet,
          subsets: [...state.singleSet.subsets, action.subset],
        },
      };
    case CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default setsReducer;
