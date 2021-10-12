// STATE
export interface CardState {
  id: number;
  name: string;
  number: string;
  rookie: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  teamId: number | null;
  team: {
    id: number;
    name: string;
    leagueId: number;
  } | null;
  players: Player[];
}

interface Player {
  id: number;
  name: string;
  birthday: string;
  hallOfFame: boolean;
  card_data_player: {
    cardDatumId: number;
    playerId: number;
    createdAt: string;
    updatedAt: string;
  };
}

// ACTION TYPES
export const GET_CARD_REQUEST = "GET_CARD_REQUEST";
export const GET_CARD_SUCCESS = "GET_CARD_SUCCESS";
export const GET_CARD_FAILURE = "GET_CARD_FAILURE";
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";
export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

// ACTION CREATORS
interface GetCardRequest {
  type: typeof GET_CARD_REQUEST;
}
interface GetCardSuccess {
  type: typeof GET_CARD_SUCCESS;
  card: CardState;
}
interface GetCardFailure {
  type: typeof GET_CARD_FAILURE;
}

interface UpdateCardRequest {
  type: typeof UPDATE_CARD_REQUEST;
}
interface UpdateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS;
  updatedCard: CardState;
}
interface UpdateCardFailure {
  type: typeof UPDATE_CARD_FAILURE;
}

interface DeleteCardRequest {
  type: typeof DELETE_CARD_REQUEST;
}
interface DeleteCardSuccess {
  type: typeof DELETE_CARD_SUCCESS;
}
interface DeleteCardFailure {
  type: typeof DELETE_CARD_FAILURE;
}

export type CardActionTypes =
  | GetCardRequest
  | GetCardSuccess
  | GetCardFailure
  | UpdateCardRequest
  | UpdateCardSuccess
  | UpdateCardFailure
  | DeleteCardRequest
  | DeleteCardSuccess
  | DeleteCardFailure;
