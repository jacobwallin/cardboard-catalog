// STATE
export interface PlayersState {
  rows: Player[];
  count: number;
}

export interface Player {
  id: number;
  name: string;
  fullName: string;
  birthday: string;
  hallOfFame: boolean;
  url: string;
  leagueId: number;
  createdAt: string;
  updatedAt: string;
}

// ACTION TYPES
export const GET_ALL_PLAYERS_REQUEST = "GET_ALL_PLAYERS_REQUEST";
export const GET_ALL_PLAYERS_SUCCESS = "GET_ALL_PLAYERS_SUCCESS";
export const GET_ALL_PLAYERS_FAILURE = "GET_ALL_PLAYERS_FAILURE";
export const CREATE_PLAYER_REQUEST = "CREATE_PLAYER_REQUEST";
export const CREATE_PLAYER_SUCCESS = "CREATE_PLAYER_SUCCESS";
export const CREATE_PLAYER_FAILURE = "CREATE_PLAYER_FAILURE";
export const UPDATE_PLAYER_REQUEST = "UPDATE_PLAYER_REQUEST";
export const UPDATE_PLAYER_SUCCESS = "UPDATE_PLAYER_SUCCESS";
export const UPDATE_PLAYER_FAILURE = "UPDATE_PLAYER_FAILURE";
export const BULK_CREATE_PLAYER_REQUEST = "BULK_CREATE_PLAYER_REQUEST";
export const BULK_CREATE_PLAYER_SUCCESS = "BULK_CREATE_PLAYER_SUCCESS";
export const BULK_CREATE_PLAYER_FAILURE = "BULK_CREATE_PLAYER_FAILURE";
export const CLEAR_PLAYERS = "CLEAR_PLAYERS";

// ACTION CREATORS
interface GetAllPlayersRequest {
  type: typeof GET_ALL_PLAYERS_REQUEST;
}
interface GetAllPlayersSuccess {
  type: typeof GET_ALL_PLAYERS_SUCCESS;
  players: PlayersState;
}
interface GetAllPlayersFailure {
  type: typeof GET_ALL_PLAYERS_FAILURE;
}

interface CreatePlayerRequest {
  type: typeof CREATE_PLAYER_REQUEST;
}
interface CreatePlayerSuccess {
  type: typeof CREATE_PLAYER_SUCCESS;
  player: Player;
}
interface CreatePlayerFailure {
  type: typeof CREATE_PLAYER_FAILURE;
}

interface UpdatePlayerRequest {
  type: typeof UPDATE_PLAYER_REQUEST;
}
interface UpdatePlayerSuccess {
  type: typeof UPDATE_PLAYER_SUCCESS;
  player: Player;
}
interface UpdatePlayerFailure {
  type: typeof UPDATE_PLAYER_FAILURE;
}

interface BulkCreatePlayerRequest {
  type: typeof BULK_CREATE_PLAYER_REQUEST;
}
interface BulkCreatePlayerSuccess {
  type: typeof BULK_CREATE_PLAYER_SUCCESS;
  players: Player[];
}
interface BulkCreatePlayerFailure {
  type: typeof BULK_CREATE_PLAYER_FAILURE;
}

interface ClearPlayers {
  type: typeof CLEAR_PLAYERS;
}

export type PlayerActionCreators =
  | GetAllPlayersRequest
  | GetAllPlayersSuccess
  | GetAllPlayersFailure
  | CreatePlayerRequest
  | CreatePlayerFailure
  | CreatePlayerSuccess
  | UpdatePlayerRequest
  | UpdatePlayerSuccess
  | UpdatePlayerFailure
  | BulkCreatePlayerRequest
  | BulkCreatePlayerSuccess
  | BulkCreatePlayerFailure
  | ClearPlayers;
