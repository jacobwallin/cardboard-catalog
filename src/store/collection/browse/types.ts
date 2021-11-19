// --- ACTION TYPES ---
export const GET_CARDS_BY_SET_REQUEST = "GET_CARDS_BY_SET_REQUEST";
export const GET_CARDS_BY_SET_SUCCESS = "GET_CARDS_BY_SET_SUCCESS";
export const GET_CARDS_BY_SET_FAILURE = "GET_CARDS_BY_SET_FAILURE";
export const GET_CARDS_BY_SUBSET_REQUEST = "GET_CARDS_BY_SUBSET_REQUEST";
export const GET_CARDS_BY_SUBSET_SUCCESS = "GET_CARDS_BY_SUBSET_SUCCESS";
export const GET_CARDS_BY_SUBSET_FAILURE = "GET_CARDS_BY_SUBSET_FAILURE";
export const GET_CARDS_IN_SINGLE_SUBSET_REQUEST =
  "GET_CARDS_IN_SINGLE_SUBSET_REQUEST";
export const GET_CARDS_IN_SINGLE_SUBSET_SUCCESS =
  "GET_CARDS_IN_SINGLE_SUBSET_SUCCESS";
export const GET_CARDS_IN_SINGLE_SUBSET_FAILURE =
  "GET_CARDS_IN_SINGLE_SUBSET_FAILURE";
export const ADD_CARDS_REQUEST = "ADD_CARDS_REQUEST";
export const ADD_CARDS_SUCCESS = "ADD_CARDS_SUCCESS";
export const ADD_CARDS_FAILURE = "ADD_CARDS_FAILURE";
export const DELETE_CARDS_REQUEST = "DELETE_CARDS_REQUEST";
export const DELETE_CARDS_SUCCESS = "DELETE_CARDS_SUCCESS";
export const DELETE_CARDS_FAILURE = "DELETE_CARDS_FAILURE";
export const SET_INITIAL_DATA_LOAD = "SET_INITIAL_DATA_LOAD";

// --- ACTIONS ---

// get carrds by set actions
interface GetCardsBySetRequest {
  type: typeof GET_CARDS_BY_SET_REQUEST;
}
interface GetCardsBySetSuccess {
  type: typeof GET_CARDS_BY_SET_SUCCESS;
  cardsBySet: SetCards[];
}
interface GetCardsBySetFailure {
  type: typeof GET_CARDS_BY_SET_FAILURE;
}

// get cards by subset actions
interface GetCardsBySubsetRequest {
  type: typeof GET_CARDS_BY_SUBSET_REQUEST;
}
interface GetCardsBySubsetSuccess {
  type: typeof GET_CARDS_BY_SUBSET_SUCCESS;
  cardsBySubset: SubsetCards[];
  setId: number;
}
interface GetCardsBySubsetFailure {
  type: typeof GET_CARDS_BY_SUBSET_FAILURE;
}

// get cards by single subset actions
interface GetCardsInSingleSubsetRequest {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_REQUEST;
}
interface GetCardsInSingleSubsetSuccess {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_SUCCESS;
  cards: UserCard[];
  subsetId: number;
}
interface GetCardsInSingleSubsetFailure {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_FAILURE;
}

interface AddCardsRequest {
  type: typeof ADD_CARDS_REQUEST;
}
export interface AddCardsSuccess {
  type: typeof ADD_CARDS_SUCCESS;
  newCards: NewCardsResponse[];
  cardData: CardData[];
  subsetId: number;
}
interface AddCardsFailure {
  type: typeof ADD_CARDS_FAILURE;
}

interface DeleteCardsRequest {
  type: typeof DELETE_CARDS_REQUEST;
}
interface DeleteCardsSuccess {
  type: typeof DELETE_CARDS_SUCCESS;
  userCardIds: number[];
}
interface DeleteCardsFailure {
  type: typeof DELETE_CARDS_FAILURE;
}

interface SetInitialDataLoad {
  type: typeof SET_INITIAL_DATA_LOAD;
  status: boolean;
}

export type CollectionActionTypes =
  | GetCardsBySetSuccess
  | GetCardsBySetRequest
  | GetCardsBySetFailure
  | GetCardsBySubsetSuccess
  | GetCardsBySubsetRequest
  | GetCardsBySubsetFailure
  | GetCardsInSingleSubsetSuccess
  | GetCardsInSingleSubsetRequest
  | GetCardsInSingleSubsetFailure
  | AddCardsRequest
  | AddCardsSuccess
  | AddCardsFailure
  | DeleteCardsRequest
  | DeleteCardsSuccess
  | DeleteCardsFailure
  | SetInitialDataLoad;

// ---- *** COLLECTION REDUCER STATE TYPE *** ----
export interface CollectionState {
  cardsBySet: SetCards[];
  cardsBySubset: {
    subsets: SubsetCards[];
    setId: number;
  };
  cardsInSingleSubset: {
    cards: UserCard[];
    subsetId: number;
  };
  initialDataLoadComplete: boolean;
}
export interface SetCards {
  setId: number;
  setName: string;
  setDescription: string;
  release_date: string | null;
  year: number;
  distinctCards: string;
  totalCards: string;
}

export interface SubsetCards {
  subsetId: number;
  subsetName: string;
  subsetDescription: string;
  distinctCards: string;
  totalCards: string;
  setId: number;
}
export interface UserCard {
  id: number;
  serialNumber: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  cardId: number;
  gradingCompanyId: number | null;
  grade: number | null;
  card: Card;
}

export interface Card {
  id: number;
  value: number | null;
  serializedTo: number | null;
  seriesId: number;
  cardDataId: number;
}

// data sent to thunk to add cards to collection
export interface CardData {
  cardId: number;
  serialNumber?: number;
  grade?: number;
  gradingCompanyId?: number;
  card: Card;
}

// server response with cards added to collection
export interface NewCardsResponse {
  id: number;
  serialNumber: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  cardId: number;
  gradingCompanyId: number | null;
  grade: number | null;
}
