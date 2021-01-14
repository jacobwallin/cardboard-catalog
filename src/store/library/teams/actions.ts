import {
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  TeamsActionTypes,
  TeamsState,
} from "./types";

export const getAllTeamsRequest = (): TeamsActionTypes => ({
  type: GET_ALL_TEAMS_REQUEST,
});

export const getAllTeamsSuccess = (allTeams: TeamsState): TeamsActionTypes => ({
  type: GET_ALL_TEAMS_SUCCESS,
  allTeams,
});
