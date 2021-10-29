// STATE
export interface LibraryState {
  subset: Subset;
}

export interface Subset {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  setId: number;
  baseSeriesId: number | null;
  set: Set;
  series: Series[];
  card_data: CardData[];
}

export interface Set {
  id: number;
  name: string;
  release_date: string;
  baseSubsetId: number | null;
  createdAt: string;
  updatedAt: string;
  leagueId: number;
  brandId: number;
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
  refractor: boolean;
  shortPrint: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  cards: Card[];
}

interface Card {
  id: number;
  value: number;
  seriesId: number;
  cardDataId: number;
}
export interface CardData {
  id: number;
  name: string;
  number: string;
  note: string;
  rookie: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
  teamId: number | null;
  team: {
    id: number;
    name: string;
  } | null;
  players: Player[];
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
export interface UpdateSubsetServerResponse {
  name: string;
  description: string;
}
interface UpdateSubsetSuccess {
  type: typeof UPDATE_SUBSET_SUCCESS;
  updatedSubset: UpdateSubsetServerResponse;
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
  series: Series;
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
  | ClearLibraryAction;
