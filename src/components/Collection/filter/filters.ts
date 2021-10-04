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
  shortPrint: false,
};
