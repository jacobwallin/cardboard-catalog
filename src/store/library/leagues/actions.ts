import {
  GET_ALL_LEAGUES_REQUEST,
  GET_ALL_LEAGUES_SUCCESS,
  GET_ALL_LEAGUES_FAILURE,
  LeaguesActionTypes,
  League,
} from "./types";

export const getAllLeaguesRequest = (): LeaguesActionTypes => ({
  type: GET_ALL_LEAGUES_REQUEST,
});
export const getAllLeaguesSuccess = (
  allLeagues: League[]
): LeaguesActionTypes => ({
  type: GET_ALL_LEAGUES_SUCCESS,
  allLeagues,
});
export const getAllLeaguesFailure = (): LeaguesActionTypes => ({
  type: GET_ALL_LEAGUES_FAILURE,
});
