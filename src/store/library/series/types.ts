import { SubsetInstance } from "../subsets/types";
import { SetInstance } from "../sets/types";

// STATE
export interface SeriesState {
  series: Series;
}

export interface CondensedSeriesInstance {
  id: number;
  name: string;
  color: string;
  serialized: number | null;
  refractor: boolean;
  parallel: boolean;
  subsetId: number;
  // auto: boolean;
  // relic: boolean;
  // manufacturedRelic: boolean;
  // shortPrint: boolean;
}

export interface SeriesInstance extends CondensedSeriesInstance {
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface Series extends SeriesInstance {
  subset: SubsetWthJoin;
  cards: Array<Card>;
  createdByUser: {
    username: string;
  };
  updatedByUser: {
    username: string;
  };
}

export interface SubsetWthJoin extends SubsetInstance {
  set: SetInstance;
}

export interface Card {
  id: number;
  value: number | null;
  serializedTo: number | null;
  seriesId: number;
  createdBy: number;
  updatedBy: number;
  cardDataId: number;
  card_datum: {
    id: number;
    name: string;
    number: string;
    note: string;
    rookie: boolean;
    subsetId: number;
    teamId: number | null;
    players: Player[];
    team: {
      id: number;
      name: string;
      leagueId: number;
    } | null;
  };
  createdByUser: {
    username: string;
  };
  updatedByUser: {
    username: string;
  };
}

interface Player {
  id: number;
  name: string;
  fullName: string;
  birthday: string;
  hallOfFame: boolean;
  url: string;
  card_data_player: {
    cardDatumId: number;
    playerId: number;
    createdAt: string;
    updatedAt: string;
  };
}

// data needed to post or put series
export interface PostSeriesData {
  subsetId: number;
  name: string;
  serialized: number | null;
  refractor: boolean;
}

// ACTION TYPES
export const GET_SERIES_REQUEST = "GET_SERIES_REQUEST";
export const GET_SERIES_SUCCESS = "GET_SERIES_SUCCESS";
export const GET_SERIES_FAILURE = "GET_SERIES_FAILURE";
export const UPDATE_SERIES_REQUEST = "UPDATE_SERIES_REQUEST";
export const UPDATE_SERIES_SUCCESS = "UPDATE_SERIES_SUCCESS";
export const UPDATE_SERIES_FAILURE = "UPDATE_SERIES_FAILURE";
export const DELETE_SERIES_REQUEST = "DELETE_SERIES_REQUEST";
export const DELETE_SERIES_SUCCESS = "DELETE_SERIES_SUCCESS";
export const DELETE_SERIES_FAILURE = "DELETE_SERIES_FAILURE";
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

// ACTION CREATORS
interface GetSeriesRequest {
  type: typeof GET_SERIES_REQUEST;
}
interface GetSeriesSuccess {
  type: typeof GET_SERIES_SUCCESS;
  series: Series;
}
interface GetSeriesFailure {
  type: typeof GET_SERIES_FAILURE;
}

interface UpdateSeriesRequest {
  type: typeof UPDATE_SERIES_REQUEST;
}

interface UpdateSeriesResponse extends SeriesInstance {
  subset: SubsetInstance;
  createdByUser: {
    username: string;
  };
  updatedByUser: {
    username: string;
  };
}
interface UpdateSeriesSuccess {
  type: typeof UPDATE_SERIES_SUCCESS;
  updatedSeries: UpdateSeriesResponse;
}
interface UpdateSeriesFailure {
  type: typeof UPDATE_SERIES_FAILURE;
}

interface DeleteSeriesRequest {
  type: typeof DELETE_SERIES_REQUEST;
}
interface DeleteSeriesSuccess {
  type: typeof DELETE_SERIES_SUCCESS;
}
interface DeleteSeriesFailure {
  type: typeof DELETE_SERIES_FAILURE;
}

interface UpdateCardRequest {
  type: typeof UPDATE_CARD_REQUEST;
}

export interface UpdateCardResponse {
  id: number;
  value: number | null;
  serializedTo: number | null;
  createdAt: string;
  updatedAt: string;
  seriesId: number;
  cardDataId: number;
}

interface UpdateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS;
  updatedCard: UpdateCardResponse;
}
interface UpdateCardFailure {
  type: typeof UPDATE_CARD_FAILURE;
}

export type SeriesActionTypes =
  | GetSeriesRequest
  | GetSeriesSuccess
  | GetSeriesFailure
  | UpdateSeriesRequest
  | UpdateSeriesSuccess
  | UpdateSeriesFailure
  | DeleteSeriesRequest
  | DeleteSeriesSuccess
  | DeleteSeriesFailure
  | UpdateCardRequest
  | UpdateCardSuccess
  | UpdateCardFailure;
