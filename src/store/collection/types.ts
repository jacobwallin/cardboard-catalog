export const GET_CARDS_BY_SET = "GET_CARDS_BY_SET";
export const GET_CARDS_BY_SUBSET = "GET_CARDS_BY_SUBSET";
export const GET_CARDS_IN_SINGLE_SUBSET = "GET_CARDS_IN_SINGLE_SUBSET";
export const CLEAR_COLLECTION = "CLEAR_COLLECTION";

interface GetCardsBySetAction {
  type: typeof GET_CARDS_BY_SET;
  cardsBySet: SetCards[];
}

interface GetCardsBySubsetAction {
  type: typeof GET_CARDS_BY_SUBSET;
  cardsBySubset: SubsetCards[];
}
interface GetCardsInSingleSubsetAction {
  type: typeof GET_CARDS_IN_SINGLE_SUBSET;
  singleSubsetCards: UserCard[];
}

interface ClearCollectionAction {
  type: typeof CLEAR_COLLECTION;
}

export type CollectionActionTypes =
  | GetCardsBySetAction
  | GetCardsBySubsetAction
  | GetCardsInSingleSubsetAction
  | ClearCollectionAction;

// COLLECTION REDUCER STATE TYPE
export interface CollectionState {
  cardsBySet: SetCards[];
  cardsBySubset: SubsetCards[];
  cardsInSingleSubset: UserCard[];
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
