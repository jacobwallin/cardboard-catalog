export interface Filters {
  sportId: number;
  year: number;
  setId: number;
  subsetId: number;
  seriesId: number;
  teamId: string;
  player: string;
  serialized: number;
  rookie: number;
  auto: number;
  relic: number;
  manufacturedRelic: number;
  parallel: number;
  refractor: number;
  shortPrint: number;
  hallOfFame: number;
  graded: number;
  playerSearch: string;
}

export const initialFilters: Filters = {
  sportId: 0,
  year: 0,
  setId: 0,
  subsetId: 0,
  seriesId: 0,
  teamId: "",
  player: "",
  serialized: 0,
  rookie: 0,
  auto: 0,
  relic: 0,
  manufacturedRelic: 0,
  parallel: 0,
  refractor: 0,
  shortPrint: 0,
  hallOfFame: 0,
  graded: 0,
  playerSearch: "",
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
