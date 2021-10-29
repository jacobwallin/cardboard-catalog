export interface Filters {
  year: number;
  setId: number;
  subsetId: number;
  seriesId: number;
  teamId: number;
  playerId: number;
  serialized: boolean;
  rookie: boolean;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  parallel: boolean;
  refractor: boolean;
  shortPrint: boolean;
}

export const initialFilters = {
  year: 0,
  setId: 0,
  subsetId: 0,
  seriesId: 0,
  teamId: 0,
  playerId: 0,
  serialized: false,
  rookie: false,
  auto: false,
  relic: false,
  manufacturedRelic: false,
  parallel: false,
  refractor: false,
  shortPrint: false,
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
