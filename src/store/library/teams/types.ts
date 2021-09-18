// STATE
export type TeamsState = Team[];

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  leagueId: number;
  league: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// ACTION TYPES
export const GET_ALL_TEAMS_REQUEST = "GET_ALL_TEAMS_REQUEST";
export const GET_ALL_TEAMS_SUCCESS = "GET_ALL_TEAMS_SUCCESS";
export const GET_ALL_TEAMS_FAILURE = "GET_ALL_TEAMS_FAILURE";

// ACTION CREATORS
interface GetAllTeamsRequest {
  type: typeof GET_ALL_TEAMS_REQUEST;
}
interface GetAllTeamsSuccess {
  type: typeof GET_ALL_TEAMS_SUCCESS;
  allTeams: TeamsState;
}
interface GetAllTeamsFailure {
  type: typeof GET_ALL_TEAMS_FAILURE;
}

export type TeamsActionTypes =
  | GetAllTeamsRequest
  | GetAllTeamsSuccess
  | GetAllTeamsFailure;
