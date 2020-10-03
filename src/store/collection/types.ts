export const GET_SUBSETS = "GET_SUBSETS";
export const GET_SINGLE_SUBSET = "GET_SINGLE_SUBSET";
export const CLEAR_SUBSETS = "CLEAR_SUBSETS";
export const CLEAR_SINGLE_SUBSET = "CLEAR_SINGLE_SUBSET";

interface GetSubsetsAction {
  type: typeof GET_SUBSETS;
  subsets: Subset[];
}

interface ClearSubsetsAction {
  type: typeof CLEAR_SUBSETS;
}

interface GetSingleSubsetAction {
  type: typeof GET_SINGLE_SUBSET;
  singleSubset: SingleSubset;
}

interface ClearSingleSubsetAction {
  type: typeof CLEAR_SINGLE_SUBSET;
}

export type CollectionActionTypes =
  | GetSubsetsAction
  | GetSingleSubsetAction
  | ClearSubsetsAction
  | ClearSingleSubsetAction;
export interface CollectionState {
  subsets: Subset[];
  singleSubset: SingleSubset;
}
export interface Subset {
  subsetId: number;
  subsetName: string;
  distinctCards: string;
  totalCards: string;
  setId: number;
  setYear: number;
  setName: string;
}

export type SingleSubset = UserCard[];

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
