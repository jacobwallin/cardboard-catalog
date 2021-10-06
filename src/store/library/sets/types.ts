// STATE
export interface SetsState {
  allSets: SetSummary[];
  singleSet: Set;
}

export interface SetSummary {
  id: number;
  name: string;
  release_date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseSubsetId: number | null;
  leagueId: number;
  brandId: number;
  league: {
    name: String;
    id: number;
  };
  brand: {
    name: string;
    id: number;
  };
}

export interface Set {
  id: number;
  name: string;
  release_date: string;
  description: string;
  baseSubsetId: number | null;
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
  baseSubsetId: number | null;
  description: string;
  setId: number;
}

// ACTION TYPES
export const GET_ALL_SETS_REQUEST = "GET_ALL_SETS_REQUEST";
export const GET_ALL_SETS_SUCCESS = "GET_ALL_SETS_SUCCESS";
export const GET_ALL_SETS_FAILURE = "GET_ALL_SETS_FAILURE";
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
  allSets: SetSummary[];
}
export interface getAllSetsFailure {
  type: typeof GET_ALL_SETS_FAILURE;
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

export interface UpdateSetServerResponse {
  id: number;
  name: string;
  release_date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseSubsetId: number;
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
export interface UpdateSetFailure {
  type: typeof UPDATE_SET_FAILURE;
}

export interface CreateSubsetRequest {
  type: typeof CREATE_SUBSET_REQUEST;
}

export interface CreateSubsetSuccess {
  type: typeof CREATE_SUBSET_SUCCESS;
  subset: SubsetSummary;
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
  | getAllSetsFailure
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
