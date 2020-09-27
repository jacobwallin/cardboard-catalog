export const GET_SUBSETS = "GET_SUBSETS";
export const GET_SINGLE_SUBSET = "GET_SINGLE_SUBSET";

interface GetSubsetsAction {
  type: typeof GET_SUBSETS;
  subsets: Subset[];
}

interface GetSingleSubsetAction {
  type: typeof GET_SINGLE_SUBSET;
  singleSubset: SingleSubset;
}

export type CollectionActionTypes = GetSubsetsAction | GetSingleSubsetAction;
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
  };
}
