// STATE
export type PlayersState = Player[];

export interface Player {
  id: number;
  name: string;
  fullName: string;
  birthday: string;
  hallOfFame: boolean;
  url: string;
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
export const BULK_CREATE_PLAYER_REQUEST = "BULK_CREATE_PLAYER_REQUEST";
export const BULK_CREATE_PLAYER_SUCCESS = "BULK_CREATE_PLAYER_SUCCESS";
export const BULK_CREATE_PLAYER_FAILURE = "BULK_CREATE_PLAYER_FAILURE";

// ACTION CREATORS
interface GetAllPlayersRequest {
  type: typeof GET_ALL_PLAYERS_REQUEST;
}
interface GetAllPlayersSuccess {
  type: typeof GET_ALL_PLAYERS_SUCCESS;
  players: Player[];
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

export type PlayerActionCreators =
  | GetAllPlayersRequest
  | GetAllPlayersSuccess
  | GetAllPlayersFailure
  | CreatePlayerRequest
  | CreatePlayerFailure
  | CreatePlayerSuccess
  | BulkCreatePlayerRequest
  | BulkCreatePlayerSuccess
  | BulkCreatePlayerFailure;
