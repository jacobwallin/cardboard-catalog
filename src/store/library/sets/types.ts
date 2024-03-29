import { SubsetInstance } from "../subsets/types";

// STATE
export interface SetsState {
  set: Set;
  allSets: {
    count: number;
    rows: SetSummary[];
  };
  setYears: Year[];
}

export interface CondensedSetInstance {
  id: number;
  name: string;
  year: number;
  leagueId: number;
  brandId: number;
}

export interface SetInstance extends CondensedSetInstance {
  complete: boolean;
  description: string;
  release_date: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface SetSummary extends CondensedSetInstance {
  complete: boolean;
  release_date: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  league: {
    name: string;
    id: number;
  };
  brand: {
    name: string;
    id: number;
  };
}

export interface Set extends SetInstance {
  createdByUser: {
    username: string;
  };
  updatedByUser: {
    username: string;
  };
  league: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  subsets: SubsetInstance[];
}

export interface Year {
  year: number;
}

// ACTION TYPES
export const GET_ALL_SETS_REQUEST = "GET_ALL_SETS_REQUEST";
export const GET_ALL_SETS_SUCCESS = "GET_ALL_SETS_SUCCESS";
export const GET_ALL_SETS_FAILURE = "GET_ALL_SETS_FAILURE";
export const GET_ALL_SET_YEARS_REQUEST = "GET_ALL_SET_YEARS_REQUEST";
export const GET_ALL_SET_YEARS_SUCCESS = "GET_ALL_SET_YEARS_SUCCESS";
export const GET_ALL_SET_YEARS_FAILURE = "GET_ALL_SET_YEARS_FAILURE";
export const GET_SINGLE_SET_REQUEST = "GET_SINGLE_SET_REQUEST";
export const GET_SINGLE_SET_SUCCESS = "GET_SINGLE_SET_SUCCESS";
export const GET_SINGLE_SET_FAILURE = "GET_SINGLE_SET_FAILURE";
export const UPDATE_SET_REQUEST = "UPDATE_SET_REQUEST";
export const UPDATE_SET_SUCCESS = "UPDATE_SET_SUCCESS";
export const UPDATE_SET_FAILURE = "UPDATE_SET_FAILURE";
export const DELETE_SET_REQUEST = "DELETE_SET_REQUEST";
export const DELETE_SET_SUCCESS = "DELETE_SET_SUCCESS";
export const DELETE_SET_FAILURE = "DELETE_SET_FAILURE";
export const CREATE_SUBSET_REQUEST = "CREATE_SUBSET_REQUEST";
export const CREATE_SUBSET_SUCCESS = "CREATE_SUBSET_SUCCESS";
export const CREATE_SUBSET_FAILURE = "CREATE_SUBSET_FAILURE";
export const CREATE_SET_REQUEST = "CREATE_SET_REQUEST";
export const CREATE_SET_SUCCESS = "CREATE_SET_SUCCESS";
export const CREATE_SET_FAILURE = "CREATE_SET_FAILURE";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

// ACTION CREATORS
export interface GetAllSetsRequest {
  type: typeof GET_ALL_SETS_REQUEST;
}
export interface GetAllSetsSuccess {
  type: typeof GET_ALL_SETS_SUCCESS;
  allSets: {
    rows: SetSummary[];
    count: number;
  };
}
export interface GetAllSetsFailure {
  type: typeof GET_ALL_SETS_FAILURE;
}

export interface GetAllSetYearsRequest {
  type: typeof GET_ALL_SET_YEARS_REQUEST;
}
export interface GetAllSetYearsSuccess {
  type: typeof GET_ALL_SET_YEARS_SUCCESS;
  years: Year[];
}
export interface GetAllSetYearsFailure {
  type: typeof GET_ALL_SET_YEARS_FAILURE;
}

export interface GetSingleSetRequest {
  type: typeof GET_SINGLE_SET_REQUEST;
}
export interface GetSingleSetSuccess {
  type: typeof GET_SINGLE_SET_SUCCESS;
  singleSet: Set;
}
export interface GetSingleSetFailure {
  type: typeof GET_SINGLE_SET_FAILURE;
}
export interface DeleteSetRequest {
  type: typeof DELETE_SET_REQUEST;
}
export interface DeleteSetSuccess {
  type: typeof DELETE_SET_SUCCESS;
  setId: number;
}
export interface DeleteSetFailure {
  type: typeof DELETE_SET_FAILURE;
}

export interface UpdateSetRequest {
  type: typeof UPDATE_SET_REQUEST;
}

export interface UpdatedSet {
  id: number;
  name: string;
  release_date: string;
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
  updatedSet: UpdatedSet;
}
export interface UpdateSetFailure {
  type: typeof UPDATE_SET_FAILURE;
}

export interface CreateSubsetRequest {
  type: typeof CREATE_SUBSET_REQUEST;
}

export interface CreateSubsetSuccess {
  type: typeof CREATE_SUBSET_SUCCESS;
  subset: SubsetInstance;
}
export interface CreateSubsetFailure {
  type: typeof CREATE_SUBSET_FAILURE;
}

export interface CreateSetRequest {
  type: typeof CREATE_SET_REQUEST;
}
export interface CreateSetSuccess {
  type: typeof CREATE_SET_SUCCESS;
  set: SetSummary;
}
export interface CreateSetFailure {
  type: typeof CREATE_SET_FAILURE;
}

export interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type SetsActionTypes =
  | GetAllSetsRequest
  | GetAllSetsSuccess
  | GetAllSetsFailure
  | GetAllSetYearsRequest
  | GetAllSetYearsSuccess
  | GetAllSetYearsFailure
  | GetSingleSetRequest
  | GetSingleSetSuccess
  | GetSingleSetFailure
  | UpdateSetRequest
  | UpdateSetSuccess
  | UpdateSetFailure
  | DeleteSetRequest
  | DeleteSetSuccess
  | DeleteSetFailure
  | CreateSubsetRequest
  | CreateSubsetSuccess
  | CreateSubsetFailure
  | CreateSetRequest
  | CreateSetSuccess
  | CreateSetFailure
  | ClearLibraryAction;
