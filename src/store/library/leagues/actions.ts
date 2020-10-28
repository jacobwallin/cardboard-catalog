import {
  GET_LEAGUES_REQUEST,
  GET_LEAGUES_SUCCESS,
  LeaguesActionTypes,
  League,
} from "./types";

export const getLeaguesRequest = (): LeaguesActionTypes => ({
  type: GET_LEAGUES_REQUEST,
});
export const getLeaguesSuccess = (
  allLeagues: League[]
): LeaguesActionTypes => ({
  type: GET_LEAGUES_SUCCESS,
  allLeagues,
});
