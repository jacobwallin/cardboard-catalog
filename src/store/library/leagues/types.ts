// STATE
export interface LeaguesState {
  allLeagues: League[];
}

export interface League {
  id: number;
  name: string;
}

// ACTION TYPES
export const GET_ALL_LEAGUES_REQUEST = "GET_ALL_LEAGUES_REQUEST";
export const GET_ALL_LEAGUES_SUCCESS = "GET_ALL_LEAGUES_SUCCESS";
export const GET_ALL_LEAGUES_FAILURE = "GET_ALL_LEAGUES_FAILURE";

// ACTION CREATORS
interface GetAllLeaguesRequest {
  type: typeof GET_ALL_LEAGUES_REQUEST;
}
interface GetAllLeaguesSuccess {
  type: typeof GET_ALL_LEAGUES_SUCCESS;
  allLeagues: League[];
}
interface GetAllLeaguesFailure {
  type: typeof GET_ALL_LEAGUES_FAILURE;
}

export type LeaguesActionTypes =
  | GetAllLeaguesRequest
  | GetAllLeaguesSuccess
  | GetAllLeaguesFailure;
