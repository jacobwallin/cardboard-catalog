export const GET_ALL_SETS_REQUEST = "GET_ALL_SETS_REQUEST";
export const GET_ALL_SETS_SUCCESS = "GET_ALL_SETS_SUCCESS";
export const GET_SINGLE_SET_REQUEST = "GET_SINGLE_SET_REQUEST";
export const GET_SINGLE_SET_SUCCESS = "GET_SINGLE_SET_SUCCESS";
export const UPDATE_SET_REQUEST = "UPDATE_SET_REQUEST";
export const UPDATE_SET_SUCCESS = "UPDATE_SET_SUCCESS";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

export interface GetAllSetsRequest {
  type: typeof GET_ALL_SETS_REQUEST;
}
export interface GetAllSetsSuccess {
  type: typeof GET_ALL_SETS_SUCCESS;
  allSets: SetSummary[];
}

export interface GetSingleSetRequest {
  type: typeof GET_SINGLE_SET_REQUEST;
}
export interface GetSingleSetSuccess {
  type: typeof GET_SINGLE_SET_SUCCESS;
  singleSet: Set;
}

export interface UpdateSetRequest {
  type: typeof UPDATE_SET_REQUEST;
}

interface UpdateSetServerResponse {
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
}
export interface UpdateSetSuccess {
  type: typeof UPDATE_SET_SUCCESS;
  updatedSet: UpdateSetServerResponse;
}

export interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type SetsActionTypes =
  | GetAllSetsRequest
  | GetAllSetsSuccess
  | GetSingleSetRequest
  | GetSingleSetSuccess
  | UpdateSetRequest
  | UpdateSetSuccess
  | ClearLibraryAction;

export interface SetsState {
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
