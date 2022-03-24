import { CondensedSetInstance } from "../../library/sets/types";
import { CondensedSubsetInstance } from "../../library/subsets/types";
import { CondensedSeriesInstance } from "../../library/series/types";

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
    series: FilterSeries;
    card_datum: {
      id: number;
      name: string;
      number: string;
      note: string;
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

interface FilterSeries extends CondensedSeriesInstance {
  subset: FilterSubset;
}

interface FilterSubset extends CondensedSubsetInstance {
  set: CondensedSetInstance;
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
