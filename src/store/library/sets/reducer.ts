import * as types from "./types";

const initialState: types.SetsState = {
  allSets: [],
  set: {
    id: 0,
    name: "",
    release_date: "",
    year: 0,
    complete: false,
    baseSubsetId: 0,
    description: "",
    createdAt: "",
    updatedAt: "",
    createdBy: 0,
    updatedBy: 0,
    createdByUser: {
      username: "",
    },
    updatedByUser: {
      username: "",
    },
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
  action: types.SetsActionTypes
): types.SetsState => {
  switch (action.type) {
    case types.GET_SINGLE_SET_SUCCESS:
      return { ...state, set: action.singleSet };
    case types.GET_ALL_SETS_SUCCESS:
      return { ...state, allSets: action.allSets };
    case types.CREATE_SET_SUCCESS:
      return { ...state, allSets: [...state.allSets, action.set] };
    case types.UPDATE_SET_SUCCESS:
      /// update both the single set and all sets state to reflect updates to a set
      return {
        ...state,
        set: { ...state.set, ...action.updatedSet },
        allSets: state.allSets.map((set) => {
          if (set.id !== action.updatedSet.id) return set;
          return {
            ...set,
            id: action.updatedSet.id,
            name: action.updatedSet.name,
            release_date: action.updatedSet.release_date,
            description: action.updatedSet.description,
            baseSubsetId: action.updatedSet.baseSubsetId,
            leagueId: action.updatedSet.league.id,
            brandId: action.updatedSet.brand.id,
            league: action.updatedSet.league,
            brand: action.updatedSet.brand,
          };
        }),
      };
    case types.DELETE_SET_SUCCESS:
      return {
        ...state,
        set: initialState.set,
        allSets: state.allSets.filter((set) => {
          return set.id !== action.setId;
        }),
      };
    case types.CREATE_SUBSET_SUCCESS:
      return {
        ...state,
        set: {
          ...state.set,
          subsets: [...state.set.subsets, action.subset],
        },
      };
    case types.CLEAR_LIBRARY:
      return initialState;
    default:
      return state;
  }
};

export default setsReducer;
