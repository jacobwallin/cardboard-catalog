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
  cards: Card[];
}

export interface Card {
  id: number;
  seriesId: number;
  cardDataId: number;
  card_datum: {
    id: number;
    name: string;
    number: string;
    rookie: boolean;
    playerId: number;
    teamId: number;
    players: Player[];
    team: {
      name: string;
    };
  };
}

interface Player {
  id: number;
  firstName: string;
  lastName: string;
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

export type SeriesActionTypes =
  | GetSeriesRequest
  | GetSeriesSuccess
  | GetSeriesFailure
  | UpdateSeriesRequest
  | UpdateSeriesSuccess
  | UpdateSeriesFailure;
