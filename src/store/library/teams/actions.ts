import {
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
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
export const getAllTeamsFailure = (): TeamsActionTypes => ({
  type: GET_ALL_TEAMS_FAILURE,
});
