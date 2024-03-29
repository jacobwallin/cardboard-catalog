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
export const ADD_CARDS = "ADD_CARDS";
export const DELETE_CARDS = "DELETE_CARDS";
export const SET_INITIAL_DATA_LOAD = "SET_INITIAL_DATA_LOAD";
export const SET_FRIEND = "SET_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const CLEAR_COLLECTION_DATA = "CLEAR_COLLECTION_DATA";

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
interface SetInitialDataLoad {
  type: typeof SET_INITIAL_DATA_LOAD;
  status: boolean;
}

export interface AddCards {
  type: typeof ADD_CARDS;
  newCards: UserCard[];
}

export interface DeleteCards {
  type: typeof DELETE_CARDS;
  userCardIds: number[];
}

export interface SetFriend {
  type: typeof SET_FRIEND;
  friend: Friend;
}
export interface RemoveFriend {
  type: typeof REMOVE_FRIEND;
}
export interface ClearCollectionData {
  type: typeof CLEAR_COLLECTION_DATA;
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
  | AddCards
  | DeleteCards
  | SetInitialDataLoad
  | SetFriend
  | RemoveFriend
  | ClearCollectionData;

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
  friend: Friend;
}

export interface Friend {
  id: number;
  username: string;
}

export interface SetCards {
  setId: number;
  setName: string;
  year: number;
  leagueId: number;
  distinctCards: string;
  totalCards: string;
}

export interface SubsetCards {
  subsetId: number;
  subsetName: string;
  subsetDescription: string;
  distinctCards: string;
  totalCards: string;
  prefix: string;
  setId: number;
}
export interface UserCard {
  id: number;
  serialNumber: number | null;
  grade: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  cardId: number;
  gradingCompanyId: number | null;
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
}
