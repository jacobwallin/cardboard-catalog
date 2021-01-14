export const GET_CARD_BY_ID_REQUEST = "GET_CARD_BY_ID_REQUEST";
export const GET_CARD_BY_ID_SUCCESS = "GET_CARD_BY_ID_SUCCESS";
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";

interface GetCardByIdRequest {
  type: typeof GET_CARD_BY_ID_REQUEST;
}

interface GetCardByIdSuccess {
  type: typeof GET_CARD_BY_ID_SUCCESS;
  card: CardState;
}

interface UpdateCardRequest {
  type: typeof UPDATE_CARD_REQUEST;
}

interface UpdateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS;
}

export type CardActionTypes =
  | GetCardByIdRequest
  | GetCardByIdSuccess
  | UpdateCardRequest
  | UpdateCardSuccess;

export interface CardState {
  id: number;
  createdAt: string;
  updatedAt: string;
  seriesId: number;
  cardDataId: number;
  card_datum: {
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
  };
  series: {
    id: number;
    name: string;
    color: string;
    serializedTo: number;
    createdAt: string;
    updatedAt: string;
    subsetId: number;
  };
}
