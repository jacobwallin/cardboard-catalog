// STATE
export interface SeriesState {
  series: Series;
}

export interface Series {
  id: number;
  name: string;
  color: string;
  serialized: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  parallel: boolean;
  shortPrint: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  subset: Subset;
  cards: Card[];
}

export interface Subset {
  id: number;
  name: string;
  description: string;
  baseSeriesId: number;
  createdAt: string;
  updatedAt: string;
  setId: number;
}

export interface Card {
  id: number;
  seriesId: number;
  cardDataId: number;
  card_datum: {
    id: number;
    name: string;
    number: string;
    note: string;
    rookie: boolean;
    createdAt: string;
    updatedAt: string;
    subsetId: number;
    teamId: number | null;
    players: Player[];
    team: {
      id: number;
      name: string;
    } | null;
  };
}

interface Player {
  id: number;
  name: string;
  fullName: string;
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
export const GET_SERIES_REQUEST = "GET_SERIES_REQUEST";
export const GET_SERIES_SUCCESS = "GET_SERIES_SUCCESS";
export const GET_SERIES_FAILURE = "GET_SERIES_FAILURE";
export const UPDATE_SERIES_REQUEST = "UPDATE_SERIES_REQUEST";
export const UPDATE_SERIES_SUCCESS = "UPDATE_SERIES_SUCCESS";
export const UPDATE_SERIES_FAILURE = "UPDATE_SERIES_FAILURE";
export const DELETE_SERIES_REQUEST = "DELETE_SERIES_REQUEST";
export const DELETE_SERIES_SUCCESS = "DELETE_SERIES_SUCCESS";
export const DELETE_SERIES_FAILURE = "DELETE_SERIES_FAILURE";

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
interface UpdateSeriesSuccess {
  type: typeof UPDATE_SERIES_SUCCESS;
  updatedSeries: Series;
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

export type SeriesActionTypes =
  | GetSeriesRequest
  | GetSeriesSuccess
  | GetSeriesFailure
  | UpdateSeriesRequest
  | UpdateSeriesSuccess
  | UpdateSeriesFailure
  | DeleteSeriesRequest
  | DeleteSeriesSuccess
  | DeleteSeriesFailure;
