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

export type PlayerActionCreators =
  | GetAllPlayersRequest
  | GetAllPlayersSuccess
  | GetAllPlayersFailure;
