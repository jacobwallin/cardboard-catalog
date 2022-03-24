import { SetInstance } from "../sets/types";
import { SeriesInstance } from "../series/types";

// STATE

export interface CondensedSubsetInstance {
  id: number;
  name: string;
  baseSeriesId: number | null;
  prefix: string;
  code: string | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  shortPrint: boolean;
  setId: number;
}
export interface SubsetInstance extends CondensedSubsetInstance {
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface Subset extends SubsetInstance {
  set: SetInstance;
  series: SubsetSeries[];
  card_data: CardData[];
  createdByUser: {
    username: string;
  };
  updatedByUser: {
    username: string;
  };
}

export interface SubsetSeries extends SeriesInstance {
  cards: Card[];
}

interface Card {
  id: number;
  value: number;
  seriesId: number;
  cardDataId: number;
  serializedTo: number | null;
}
export interface CardData {
  id: number;
  name: string;
  number: string;
  note: string;
  rookie: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  subsetId: number;
  teamId: number | null;
  team: {
    id: number;
    name: string;
    leagueId: number;
  } | null;
  players: Player[];
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

// ACTION TYPES
export const GET_SUBSET_REQUEST = "GET_SUBSET_REQUEST";
export const GET_SUBSET_SUCCESS = "GET_SUBSET_SUCCESS";
export const GET_SUBSET_FAILURE = "GET_SUBSET_FAILURE";
export const UPDATE_SUBSET_REQUEST = "UPDATE_SUBSET_REQUEST";
export const UPDATE_SUBSET_SUCCESS = "UPDATE_SUBSET_SUCCESS";
export const UPDATE_SUBSET_FAILURE = "UPDATE_SUBSET_FAILURE";
export const DELETE_SUBSET_REQUEST = "DELETE_SUBSET_REQUEST";
export const DELETE_SUBSET_SUCCESS = "DELETE_SUBSET_SUCCESS";
export const DELETE_SUBSET_FAILURE = "DELETE_SUBSET_FAILURE";
export const CREATE_SERIES_REQUEST = "CREATE_SERIES_REQUEST";
export const CREATE_SERIES_SUCCESS = "CREATE_SERIES_SUCCESS";
export const CREATE_SERIES_FAILURE = "CREATE_SERIES_FAILURE";
export const CREATE_CARD_REQUEST = "CREATE_CARD_REQUEST";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE";
export const BULK_CREATE_CARD_REQUEST = "BULK_CREATE_CARD_REQUEST";
export const BULK_CREATE_CARD_SUCCESS = "BULK_CREATE_CARD_SUCCESS";
export const BULK_CREATE_CARD_FAILURE = "BULK_CREATE_CARD_FAILURE";
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";
export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";
export const DELETE_ALL_CARDS_REQUEST = "DELETE_ALL_CARDS_REQUEST";
export const DELETE_ALL_CARDS_SUCCESS = "DELETE_ALL_CARDS_SUCCESS";
export const DELETE_ALL_CARDS_FAILURE = "DELETE_ALL_CARDS_FAILURE";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

// ACTION CREATORS
interface GetSubsetRequest {
  type: typeof GET_SUBSET_REQUEST;
}
interface GetSubsetSuccess {
  type: typeof GET_SUBSET_SUCCESS;
  subset: Subset;
}
interface GetSubsetFailure {
  type: typeof GET_SUBSET_FAILURE;
}
interface UpdateSubsetRequest {
  type: typeof UPDATE_SUBSET_REQUEST;
}
export interface UpdatedSubset {
  id: number;
  name: string;
  description: string;
  prefix: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  setId: number;
  baseSeriesId: number | null;
  updatedByUser: {
    username: string;
  };
  createdByUser: {
    username: string;
  };
}
interface UpdateSubsetSuccess {
  type: typeof UPDATE_SUBSET_SUCCESS;
  updatedSubset: UpdatedSubset;
}
interface UpdateSubsetFailure {
  type: typeof UPDATE_SUBSET_FAILURE;
}
interface DeleteSubsetRequest {
  type: typeof DELETE_SUBSET_REQUEST;
}
interface DeleteSubsetSuccess {
  type: typeof DELETE_SUBSET_SUCCESS;
}
interface DeleteSubsetFailure {
  type: typeof DELETE_SUBSET_FAILURE;
}
interface CreateSeriesRequest {
  type: typeof CREATE_SERIES_REQUEST;
}
interface CreateSeriesSuccess {
  type: typeof CREATE_SERIES_SUCCESS;
  series: SubsetSeries;
}
interface CreateSeriesFailure {
  type: typeof CREATE_SERIES_FAILURE;
}
interface CreateCardRequest {
  type: typeof CREATE_CARD_REQUEST;
}
interface CreateCardSuccess {
  type: typeof CREATE_CARD_SUCCESS;
  card: CardData;
}
interface CreateCardFailure {
  type: typeof CREATE_CARD_FAILURE;
}
interface BulkCreateCardRequest {
  type: typeof BULK_CREATE_CARD_REQUEST;
}
interface BulkCreateCardSuccess {
  type: typeof BULK_CREATE_CARD_SUCCESS;
  cards: CardData[];
}
interface BulkCreateCardFailure {
  type: typeof BULK_CREATE_CARD_FAILURE;
}
interface UpdateCardRequest {
  type: typeof UPDATE_CARD_REQUEST;
}
interface UpdateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS;
  updatedCard: CardData;
}
interface UpdateCardFailure {
  type: typeof UPDATE_CARD_FAILURE;
}

interface DeleteCardRequest {
  type: typeof DELETE_CARD_REQUEST;
}
interface DeleteCardSuccess {
  type: typeof DELETE_CARD_SUCCESS;
  cardDataId: number;
}
interface DeleteCardFailure {
  type: typeof DELETE_CARD_FAILURE;
}

interface DeleteAllCardsRequest {
  type: typeof DELETE_ALL_CARDS_REQUEST;
}
interface DeleteAllCardsSuccess {
  type: typeof DELETE_ALL_CARDS_SUCCESS;
}
interface DeleteAllCardsFailure {
  type: typeof DELETE_ALL_CARDS_FAILURE;
}
interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type SubsetActionTypes =
  | GetSubsetRequest
  | GetSubsetSuccess
  | GetSubsetFailure
  | UpdateSubsetRequest
  | UpdateSubsetSuccess
  | UpdateSubsetFailure
  | DeleteSubsetRequest
  | DeleteSubsetSuccess
  | DeleteSubsetFailure
  | CreateSeriesRequest
  | CreateSeriesSuccess
  | CreateSeriesFailure
  | CreateCardRequest
  | CreateCardSuccess
  | CreateCardFailure
  | BulkCreateCardRequest
  | BulkCreateCardSuccess
  | BulkCreateCardFailure
  | UpdateCardRequest
  | UpdateCardSuccess
  | UpdateCardFailure
  | DeleteCardRequest
  | DeleteCardSuccess
  | DeleteCardFailure
  | DeleteAllCardsRequest
  | DeleteAllCardsSuccess
  | DeleteAllCardsFailure
  | ClearLibraryAction;
