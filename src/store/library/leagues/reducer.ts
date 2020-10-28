import { LeaguesState, LeaguesActionTypes, GET_LEAGUES_SUCCESS } from "./types";

const initialState: LeaguesState = {
  allLeagues: [],
};

const leaguesReducer = (
  state: LeaguesState = initialState,
  action: LeaguesActionTypes
) => {
  switch (action.type) {
    case GET_LEAGUES_SUCCESS:
      return { ...state, allLeagues: action.allLeagues };
    default:
      return state;
  }
};

export default leaguesReducer;
