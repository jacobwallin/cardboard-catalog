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
export const GET_TEAMS_BY_LEAGUE_REQUEST = "GET_TEAMS_BY_LEAGUE_REQUEST";
export const GET_TEAMS_BY_LEAGUE_SUCCESS = "GET_TEAMS_BY_LEAGUE_SUCCESS";
export const GET_TEAMS_BY_LEAGUE_FAILURE = "GET_TEAMS_BY_LEAGUE_FAILURE";
export const ADD_TEAM_REQUEST = "ADD_TEAM_REQUEST";
export const ADD_TEAM_SUCCESS = "ADD_TEAM_SUCCESS";
export const ADD_TEAM_FAILURE = "ADD_TEAM_FAILURE";
export const UPDATE_TEAM_REQUEST = "UPDATE_TEAM_REQUEST";
export const UPDATE_TEAM_SUCCESS = "UPDATE_TEAM_SUCCESS";
export const UPDATE_TEAM_FAILURE = "UPDATE_TEAM_FAILURE";

// ACTION CREATORS
interface GetAllTeamsRequest {
  type: typeof GET_ALL_TEAMS_REQUEST;
}
interface GetAllTeamsSuccess {
  type: typeof GET_ALL_TEAMS_SUCCESS;
  allTeams: Team[];
}
interface GetAllTeamsFailure {
  type: typeof GET_ALL_TEAMS_FAILURE;
}

interface GetTeamsByLeagueRequest {
  type: typeof GET_TEAMS_BY_LEAGUE_REQUEST;
}
interface GetTeamsByLeagueSuccess {
  type: typeof GET_TEAMS_BY_LEAGUE_SUCCESS;
  teams: Team[];
}
interface GetTeamsByLeagueFailure {
  type: typeof GET_TEAMS_BY_LEAGUE_FAILURE;
}

interface AddTeamRequest {
  type: typeof ADD_TEAM_REQUEST;
}
interface AddTeamSuccess {
  type: typeof ADD_TEAM_SUCCESS;
  team: Team;
}
interface AddTeamFailure {
  type: typeof ADD_TEAM_FAILURE;
}

interface UpdateTeamRequest {
  type: typeof UPDATE_TEAM_REQUEST;
}
interface UpdateTeamSuccess {
  type: typeof UPDATE_TEAM_SUCCESS;
  team: Team;
}
interface UpdateTeamFailure {
  type: typeof UPDATE_TEAM_FAILURE;
}

export type TeamsActionTypes =
  | GetAllTeamsRequest
  | GetAllTeamsSuccess
  | GetAllTeamsFailure
  | GetTeamsByLeagueRequest
  | GetTeamsByLeagueSuccess
  | GetTeamsByLeagueFailure
  | AddTeamRequest
  | AddTeamSuccess
  | AddTeamFailure
  | UpdateTeamRequest
  | UpdateTeamSuccess
  | UpdateTeamFailure;
