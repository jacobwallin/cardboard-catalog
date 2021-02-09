export const GET_SERIES_BY_ID_REQUEST = "GET_SERIES_BY_ID_REQUEST";
export const GET_SERIES_BY_ID_SUCCESS = "GET_SERIES_BY_ID_SUCCESS";
export const UPDATE_SERIES_REQUEST = "UPDATE_SERIES_REQUEST";
export const UPDATE_SERIES_SUCCESS = "UPDATE_SERIES_SUCCESS";

interface GetSeriesByIdRequest {
  type: typeof GET_SERIES_BY_ID_REQUEST;
}

interface GetSeriesByIdSuccess {
  type: typeof GET_SERIES_BY_ID_SUCCESS;
  series: Series;
}

interface UpdateSeriesRequest {
  type: typeof UPDATE_SERIES_REQUEST;
}

interface UpdateSeriesSuccess {
  type: typeof UPDATE_SERIES_SUCCESS;
  updatedSeries: Series;
}

export type SeriesActionTypes =
  | GetSeriesByIdRequest
  | GetSeriesByIdSuccess
  | UpdateSeriesRequest
  | UpdateSeriesSuccess;

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
    player: {
      firstName: string;
      lastName: string;
      birthday: string;
      hallOfFame: boolean;
    };
    team: {
      name: string;
    };
  };
}
