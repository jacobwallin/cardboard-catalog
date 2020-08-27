export interface Set {
  id: number;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  BrandId: number;
  Cards: number;
}

interface Card {
  id: number;
  name: string;
  number: number;
  team: string;
}

export interface SingleSet {
  id: number;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  BrandId: number;
  Cards: Card[];
}

export interface CollectionState {
  sets: Set[];
  singleSet: SingleSet;
}

export const GET_SETS = "GET_SETS";
export const GET_SINGLE_SET = "GET_SINGLE_SET";

interface GetSetsAction {
  type: typeof GET_SETS;
  sets: Set[];
}

interface GetSingleSetAction {
  type: typeof GET_SINGLE_SET;
  singleSet: SingleSet;
}

export type CollectionActionTypes = GetSetsAction | GetSingleSetAction;
