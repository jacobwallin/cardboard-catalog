// --- ACTION TYPES ---
export const GET_CARDS_BY_SET_REQUEST = "GET_CARDS_BY_SET_REQUEST";
export const GET_CARDS_BY_SET_SUCCESS = "GET_CARDS_BY_SET_SUCCESS";
export const GET_CARDS_BY_SET_ERROR = "GET_CARDS_BY_SET_ERROR";
export const GET_CARDS_BY_SUBSET_REQUEST = "GET_CARDS_BY_SUBSET_REQUEST";
export const GET_CARDS_BY_SUBSET_SUCCESS = "GET_CARDS_BY_SUBSET_SUCCESS";
export const GET_CARDS_BY_SUBSET_ERROR = "GET_CARDS_BY_SUBSET_ERROR";
export const GET_CARDS_IN_SINGLE_SUBSET_REQUEST =
  "GET_CARDS_IN_SINGLE_SUBSET_REQUEST";
export const GET_CARDS_IN_SINGLE_SUBSET_SUCCESS =
  "GET_CARDS_IN_SINGLE_SUBSET_SUCCESS";
export const GET_CARDS_IN_SINGLE_SUBSET_ERROR =
  "GET_CARDS_IN_SINGLE_SUBSET_ERROR";
export const ADD_CARDS_REQUEST = "ADD_CARDS_REQUEST";
export const ADD_CARDS_SUCCESS = "ADD_CARDS_SUCCESS";
export const ADD_CARDS_FAILURE = "ADD_CARDS_FAILURE";
export const DELETE_CARDS_REQUEST = "DELETE_CARDS_REQUEST";
export const DELETE_CARDS_SUCCESS = "DELETE_CARDS_SUCCESS";
export const DELETE_CARDS_FAILURE = "DELETE_CARDS_FAILURE";
export const SET_INITIAL_DATA_LOAD = "SET_INITIAL_DATA_LOAD";
export const CLEAR_COLLECTION = "CLEAR_COLLECTION";

// --- ACTIONS ---

// get carrds by set actions
interface GetCardsBySetRequest {
  type: typeof GET_CARDS_BY_SET_REQUEST;
}
interface GetCardsBySetSuccess {
  type: typeof GET_CARDS_BY_SET_SUCCESS;
  cardsBySet: SetCards[];
}
interface GetCardsBySetError {
  type: typeof GET_CARDS_BY_SET_ERROR;
  message: string;
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
interface GetCardsBySubsetError {
  type: typeof GET_CARDS_BY_SUBSET_ERROR;
  message: string;
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
interface GetCardsInSingleSubsetError {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_ERROR;
  message: string;
}

interface AddCardsRequest {
  type: typeof ADD_CARDS_REQUEST;
}
interface AddCardsSuccess {
  type: typeof ADD_CARDS_SUCCESS;
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
export interface ClearCollectionAction {
  type: typeof CLEAR_COLLECTION;
}

export type CollectionActionTypes =
  | GetCardsBySetSuccess
  | GetCardsBySetRequest
  | GetCardsBySetError
  | GetCardsBySubsetSuccess
  | GetCardsBySubsetRequest
  | GetCardsBySubsetError
  | GetCardsInSingleSubsetSuccess
  | GetCardsInSingleSubsetRequest
  | GetCardsInSingleSubsetError
  | AddCardsRequest
  | AddCardsSuccess
  | AddCardsFailure
  | DeleteCardsRequest
  | DeleteCardsSuccess
  | DeleteCardsFailure
  | SetInitialDataLoad
  | ClearCollectionAction;

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
  release_date: string;
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
  card: {
    id: number;
    value: number | null;
    cardDataId: number;
    seriesId: number;
    card_datum: {
      id: number;
      name: string;
      number: string;
      rookie: boolean;
      createdAt: string;
      updatedAt: string;
      playerId: number;
      subsetId: number;
      teamId: number;
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
