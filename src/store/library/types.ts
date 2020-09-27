export const GET_SUBSET = "GET_SUBSET";
export const GET_ALL_SETS = "GET_ALL_SETS";

export interface GetSubsetAction {
  type: typeof GET_SUBSET;
  subset: Subset;
}
export interface GetAllSetsAction {
  type: typeof GET_ALL_SETS;
  allSets: Set[];
}

export type LibraryActionTypes = GetSubsetAction | GetAllSetsAction;

export interface LibraryState {
  subset: Subset;
  allSets: Set[];
}

export interface Set {
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
  subsets: SubsetSummary[];
}

export interface SubsetSummary {
  id: number;
  name: string;
  cardQuantity: number;
  setId: string;
}

export interface Subset {
  id: number;
  name: string;
  cardQuantity: number;
  createdAt: string;
  updatedAt: string;
  setId: number;
  series: Series[];
}

interface Series {
  id: number;
  name: string;
  color: string;
  serializedTo: number;
  attributes: Attribute[];
  cards: Card[];
}

interface Attribute {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  series_attribute: {
    updatedAt: string;
    createdAt: string;
    seriesId: number;
    attributeId: number;
  };
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
