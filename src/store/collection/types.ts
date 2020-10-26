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
export const SET_INITIAL_DATA_LOAD = "SET_INITIAL_DATA_LOAD";
export const CLEAR_COLLECTION = "CLEAR_COLLECTION";

// --- ACTIONS ---

// get carrds by set actions
interface GetCardsBySetRequestAction {
  type: typeof GET_CARDS_BY_SET_REQUEST;
}
interface GetCardsBySetSuccessAction {
  type: typeof GET_CARDS_BY_SET_SUCCESS;
  cardsBySet: SetCards[];
}
interface GetCardsBySetErrorAction {
  type: typeof GET_CARDS_BY_SET_ERROR;
  message: string;
}

// get cards by subset actions
interface GetCardsBySubsetRequestAction {
  type: typeof GET_CARDS_BY_SUBSET_REQUEST;
}
interface GetCardsBySubsetSuccessAction {
  type: typeof GET_CARDS_BY_SUBSET_SUCCESS;
  cardsBySubset: SubsetCards[];
  setId: number;
}
interface GetCardsBySubsetErrorAction {
  type: typeof GET_CARDS_BY_SUBSET_ERROR;
  message: string;
}

// get cards by single subset actions
interface GetCardsInSingleSubsetRequestAction {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_REQUEST;
}
interface GetCardsInSingleSubsetSuccessAction {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_SUCCESS;
  cards: UserCard[];
  subsetId: number;
}
interface GetCardsInSingleSubsetErrorAction {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET_ERROR;
  message: string;
}

interface SetInitialDataLoad {
  type: typeof SET_INITIAL_DATA_LOAD;
  status: boolean;
}
interface ClearCollectionAction {
  type: typeof CLEAR_COLLECTION;
}

export type CollectionActionTypes =
  | GetCardsBySetSuccessAction
  | GetCardsBySetRequestAction
  | GetCardsBySetErrorAction
  | GetCardsBySubsetSuccessAction
  | GetCardsBySubsetRequestAction
  | GetCardsBySubsetErrorAction
  | GetCardsInSingleSubsetSuccessAction
  | GetCardsInSingleSubsetRequestAction
  | GetCardsInSingleSubsetErrorAction
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
  quantity: number;
  serialNumber: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  cardId: number;
  card: {
    id: number;
    cardDataId: number;
    seriesId: number;
    series: {
      id: number;
      name: string;
      color: string;
      serializedTo: number;
      subsetId: number;
    };
    card_datum: {
      id: number;
      name: string;
      number: string;
      rookie: boolean;
      teamId: number;
    };
  };
}
