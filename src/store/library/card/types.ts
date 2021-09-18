// STATE
export interface CardState {
  id: number;
  name: string;
  number: string;
  rookie: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  teamId: number;
  team: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    leagueId: number;
  };
}

// ACTION TYPES
export const GET_CARD_REQUEST = "GET_CARD_REQUEST";
export const GET_CARD_SUCCESS = "GET_CARD_SUCCESS";
export const GET_CARD_FAILURE = "GET_CARD_FAILURE";
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

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

export type CardActionTypes =
  | GetCardRequest
  | GetCardSuccess
  | GetCardFailure
  | UpdateCardRequest
  | UpdateCardSuccess
  | UpdateCardFailure;
