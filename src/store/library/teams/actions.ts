import * as types from "./types";

// get all teams
export const getAllTeamsRequest = (): types.TeamsActionTypes => ({
  type: types.GET_ALL_TEAMS_REQUEST,
});

export const getAllTeamsSuccess = (
  allTeams: types.TeamsState
): types.TeamsActionTypes => ({
  type: types.GET_ALL_TEAMS_SUCCESS,
  allTeams,
});
export const getAllTeamsFailure = (): types.TeamsActionTypes => ({
  type: types.GET_ALL_TEAMS_FAILURE,
});

// get teams by league
export const getTeamsByLeagueRequest = (): types.TeamsActionTypes => ({
  type: types.GET_TEAMS_BY_LEAGUE_REQUEST,
});
export const getTeamsByLeagueSuccess = (
  teams: types.Team[]
): types.TeamsActionTypes => ({
  type: types.GET_TEAMS_BY_LEAGUE_SUCCESS,
  teams,
});
export const getTeamsByLeagueFailure = (): types.TeamsActionTypes => ({
  type: types.GET_TEAMS_BY_LEAGUE_FAILURE,
});

// add team
export const addTeamRequest = (): types.TeamsActionTypes => ({
  type: types.ADD_TEAM_REQUEST,
});
export const addTeamSuccess = (team: types.Team): types.TeamsActionTypes => ({
  type: types.ADD_TEAM_SUCCESS,
  team,
});
export const addTeamFailure = (): types.TeamsActionTypes => ({
  type: types.ADD_TEAM_FAILURE,
});

// update team
export const updateTeamRequest = (): types.TeamsActionTypes => ({
  type: types.UPDATE_TEAM_REQUEST,
});
export const updateTeamSuccess = (
  team: types.Team
): types.TeamsActionTypes => ({
  type: types.UPDATE_TEAM_SUCCESS,
  team,
});
export const updateTeamFailure = (): types.TeamsActionTypes => ({
  type: types.UPDATE_TEAM_FAILURE,
});
