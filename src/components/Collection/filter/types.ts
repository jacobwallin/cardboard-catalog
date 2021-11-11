export interface Filters {
  year: number;
  setId: number;
  subsetId: number;
  seriesId: number;
  teamId: number;
  playerId: number;
  serialized: number;
  rookie: number;
  auto: number;
  relic: number;
  manufacturedRelic: number;
  parallel: number;
  refractor: number;
  shortPrint: number;
}

export const initialFilters: Filters = {
  year: 0,
  setId: 0,
  subsetId: 0,
  seriesId: 0,
  teamId: 0,
  playerId: 0,
  serialized: 0,
  rookie: 0,
  auto: 0,
  relic: 0,
  manufacturedRelic: 0,
  parallel: 0,
  refractor: 0,
  shortPrint: 0,
};

export interface TableColumns {
  cardNumber: boolean;
  cardName: boolean;
  setName: boolean;
  dateAdded: boolean;
  team: boolean;
  players: boolean;
}

export const initialTableColumns = {
  cardNumber: true,
  cardName: true,
  setName: true,
  subsetName: true,
  dateAdded: true,
  team: false,
  players: false,
};
