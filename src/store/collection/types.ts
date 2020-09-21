export interface Subset {
  subsetId: number;
  subsetName: string;
  distinctCards: string;
  totalCards: string;
  setId: number;
  setYear: number;
  setName: string;
}

export interface SingleSubset {
  id: number;
  name: string;
  year: number;
  totalCards: number;
  createdAt: string;
  updatedAt: string;
  BrandId: number;
  Cards: Card[];
}

export interface Card {
  id: number;
  name: string;
  number: number;
  Team: {
    name: string;
  };
}

export interface CollectionState {
  subsets: Subset[];
  singleSubset: SingleSubset;
}

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
