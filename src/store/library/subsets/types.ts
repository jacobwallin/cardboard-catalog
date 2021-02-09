export const GET_SUBSET_REQUEST = "GET_SUBSET_REQUEST";
export const GET_SUBSET_SUCCESS = "GET_SUBSET_SUCCESS";
export const UPDATE_SUBSET_REQUEST = "UPDATE_SUBSET_REQUEST";
export const UPDATE_SUBSET_SUCCESS = "UPDATE_SUBSET_SUCCESS";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

export interface GetSubsetRequest {
  type: typeof GET_SUBSET_REQUEST;
}
export interface GetSubsetSuccess {
  type: typeof GET_SUBSET_SUCCESS;
  subset: Subset;
}
export interface UpdateSubsetRequest {
  type: typeof UPDATE_SUBSET_REQUEST;
}
export interface UpdateSubsetServerResponse {
  name: string;
  description: string;
}
export interface UpdateSubsetSuccess {
  type: typeof UPDATE_SUBSET_SUCCESS;
  updatedSubset: UpdateSubsetServerResponse;
}
export interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type LibraryActionTypes =
  | GetSubsetRequest
  | GetSubsetSuccess
  | UpdateSubsetRequest
  | UpdateSubsetSuccess
  | ClearLibraryAction;

export interface LibraryState {
  subset: Subset;
}

export interface Subset {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  setId: number;
  series: Series[];
  card_data: CardData[];
}

interface Series {
  id: number;
  name: string;
  color: string;
  serialized: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  parallel: boolean;
  shortPrint: boolean;
  createdAt: string;
  updatedAt: string;
  subsetId: number;
}

export interface CardData {
  id: number;
  name: string;
  number: string;
  rookie: boolean;
  createdAt: string;
  updatedAt: string;
  playerId: number;
  subsetId: number;
  teamId: number;
  team: {
    id: number;
    name: string;
  };
  player: {
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
    hallOfFame: boolean;
  };
}
