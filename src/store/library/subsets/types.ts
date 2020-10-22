export const GET_SUBSET = "GET_SUBSET";
export const CLEAR_LIBRARY = "CLEAR_LIBRARY";

export interface GetSubsetAction {
  type: typeof GET_SUBSET;
  singleSubset: Subset;
}

export interface ClearLibraryAction {
  type: typeof CLEAR_LIBRARY;
}

export type LibraryActionTypes = GetSubsetAction | ClearLibraryAction;

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
  card_datum: {
    name: string;
    number: string;
    rookie: boolean;
    team: {
      name: string;
    };
  };
}
