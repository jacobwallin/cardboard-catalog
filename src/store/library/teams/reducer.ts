import * as types from "./types";

export default function (
  state: types.TeamsState = [],
  action: types.TeamsActionTypes
) {
  switch (action.type) {
    case types.GET_ALL_TEAMS_SUCCESS:
      return action.allTeams;
    case types.GET_TEAMS_BY_LEAGUE_SUCCESS:
      return action.teams;
    case types.ADD_TEAM_SUCCESS:
      return [...state, action.team];
    case types.UPDATE_TEAM_SUCCESS:
      return state.map((t) => {
        if (t.id === action.team.id) {
          return action.team;
        }
        return t;
      });
    default:
      return state;
  }
}
