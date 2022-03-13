// STATE
export interface FilterCollectionState {
  count: number;
  rows: UserCard[];
  pdfData: UserCard[];
  dataFetched: boolean;
}

export interface UserCard {
  id: number;
  serialNumber: number | null;
  grade: number | null;
  gradingCompanyId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  cardId: number;
  grading_company: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  card: {
    id: number;
    value: number | null;
    serializedTo: number | null;
    cardDataId: number;
    seriesId: number;
    series: Series;
    card_datum: {
      id: number;
      name: string;
      number: string;
      rookie: boolean;
      subsetId: number;
      teamId: number;
      team: {
        name: string;
      };
      players: Player[];
    };
  };
}

interface Series {
  id: number;
  name: string;
  color: string;
  serialized: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  parallel: boolean;
  refractor: boolean;
  shortPrint: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  subset: Subset;
}

interface Subset {
  id: number;
  name: string;
  baseSeriesId: number;
  setId: number;
  set: Set;
}

interface Set {
  id: number;
  name: string;
  baseSubsetId: number;
  release_date: string;
  year: number;
  leagueId: number;
  brandId: number;
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

// ACTION TYPES
export const GET_CARDS_REQUEST = "GET_CARDS_REQUEST";
export const GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS";
export const GET_CARDS_FAILURE = "GET_CARDS_FAILURE";
export const GET_PDF_CARDS_REQUEST = "GET_PDF_CARDS_REQUEST";
export const GET_PDF_CARDS_SUCCESS = "GET_PDF_CARDS_SUCCESS";
export const GET_PDF_CARDS_FAILURE = "GET_PDF_CARDS_FAILURE";

// ACTION CREATORS

interface GetCardsRequest {
  type: typeof GET_CARDS_REQUEST;
}
interface GetCardsSuccess {
  type: typeof GET_CARDS_SUCCESS;
  payload: { count: number; rows: UserCard[] };
}
interface GetCardsFailure {
  type: typeof GET_CARDS_FAILURE;
}

interface GetPdfCardsRequest {
  type: typeof GET_PDF_CARDS_REQUEST;
}
interface GetPdfCardsSuccess {
  type: typeof GET_PDF_CARDS_SUCCESS;
  payload: { count: number; rows: UserCard[] };
}
interface GetPdfCardsFailure {
  type: typeof GET_PDF_CARDS_FAILURE;
}

export type FilterCollectionActions =
  | GetCardsRequest
  | GetCardsSuccess
  | GetCardsFailure
  | GetPdfCardsFailure
  | GetPdfCardsRequest
  | GetPdfCardsSuccess;
