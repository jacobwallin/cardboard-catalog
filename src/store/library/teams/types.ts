export const GET_ALL_TEAMS_REQUEST = "GET_ALL_TEAMS_REQUEST";
export const GET_ALL_TEAMS_SUCCESS = "GET_ALL_TEAMS_SUCCESS";

interface GetAllTeamsRequest {
  type: typeof GET_ALL_TEAMS_REQUEST;
}

interface GetAllTeamsSuccess {
  type: typeof GET_ALL_TEAMS_SUCCESS;
  allTeams: TeamsState;
}

export type TeamsActionTypes = GetAllTeamsRequest | GetAllTeamsSuccess;

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
