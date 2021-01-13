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
  singleSubset: Subset;
}
export interface UpdateSubsetRequest {
  type: typeof UPDATE_SUBSET_REQUEST;
}
export interface UpdateSubsetServerResponse {
  name: string;
  description: string;
  cardQuantity: number;
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
  singleSubset: Subset;
}

export interface Subset {
  id: number;
  name: string;
  cardQuantity: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  setId: number;
  series: SeriesSummary[];
}

interface SeriesSummary {
  id: number;
  name: string;
  color: string;
  serializedTo: number | null;
  attributes: Attributes[];
  cards: Card[];
}

interface Attributes {
  id: number;
  name: string;
}

export interface Card {
  id: number;
  cardDataId: number;
  card_datum: {
    id: number;
    name: string;
    number: string;
    rookie: boolean;
    team: {
      name: string;
    };
  };
}
