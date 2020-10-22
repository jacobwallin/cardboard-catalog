export const GET_ALL_SETS = "GET_ALL_SETS";
export const GET_SET = "GET_SET";
export const GET_SUBSET = "GET_SUBSET";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

export interface GetAllSetsAction {
  type: typeof GET_ALL_SETS;
  allSets: SetSummary[];
}

export interface GetSetAction {
  type: typeof GET_SET;
  singleSet: Set;
}

export interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type LibraryActionTypes =
  | GetAllSetsAction
  | GetSetAction
  | ClearLibraryAction;

export interface LibraryState {
  allSets: SetSummary[];
  singleSet: Set;
}

export interface SetSummary {
  id: number;
  name: string;
  year: number;
  brand: {
    id: number;
    name: string;
  };
  league: {
    id: number;
    name: string;
  };
}

export interface Set {
  id: number;
  name: string;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  league: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  subsets: SubsetSummary[];
}

export interface SubsetSummary {
  id: number;
  name: string;
  cardQuantity: number;
  description: string;
  setId: number;
}
