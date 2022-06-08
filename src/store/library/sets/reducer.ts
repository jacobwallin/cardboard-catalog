import * as types from "./types";

const initialState: types.SetsState = {
  allSets: {
    count: 0,
    rows: [],
  },
  setYears: [],
  set: {
    id: 0,
    name: "",
    release_date: "",
    year: 0,
    complete: false,
    leagueId: 0,
    brandId: 0,
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
    case types.GET_ALL_SET_YEARS_SUCCESS:
      return { ...state, setYears: action.years };
    case types.CREATE_SET_SUCCESS:
      return {
        ...state,
        allSets: {
          rows: [action.set, ...state.allSets.rows],
          count: state.allSets.count + 1,
        },
      };
    case types.UPDATE_SET_SUCCESS:
      /// update both the single set and all sets state to reflect updates to a set
      return {
        ...state,
        set: { ...state.set, ...action.updatedSet },
        allSets: {
          rows: state.allSets.rows.map((set) => {
            if (set.id !== action.updatedSet.id) return set;
            return {
              ...set,
              id: action.updatedSet.id,
              name: action.updatedSet.name,
              release_date: action.updatedSet.release_date,
              description: action.updatedSet.description,
              leagueId: action.updatedSet.league.id,
              brandId: action.updatedSet.brand.id,
              league: action.updatedSet.league,
              brand: action.updatedSet.brand,
            };
          }),
          count: state.allSets.count,
        },
      };
    case types.DELETE_SET_SUCCESS:
      return {
        ...state,
        set: initialState.set,
        allSets: {
          rows: state.allSets.rows.filter((set) => {
            return set.id !== action.setId;
          }),
          count: state.allSets.count - 1,
        },
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
