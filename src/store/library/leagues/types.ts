export const GET_LEAGUES_REQUEST = "GET_LEAGUES_REQUEST";
export const GET_LEAGUES_SUCCESS = "GET_LEAGUES_SUCCESS";

interface GetLeaguesRequest {
  type: typeof GET_LEAGUES_REQUEST;
}

interface GetLeaguesSuccess {
  type: typeof GET_LEAGUES_SUCCESS;
  allLeagues: League[];
}

export type LeaguesActionTypes = GetLeaguesRequest | GetLeaguesSuccess;

export interface LeaguesState {
  allLeagues: League[];
}

export interface League {
  id: number;
  name: string;
}
