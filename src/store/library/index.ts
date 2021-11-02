import { combineReducers } from "redux";

import setsReducer from "./sets/reducer";
import subsetsReducer from "./subsets/reducer";
import brandsReducer from "./brands/reducer";
import leagueReducer from "./leagues/reducer";
import seriesReducer from "./series/reducer";
import cardReducer from "./card/reducer";
import teamsReducer from "./teams/reducer";
import gradingCompaniesReducer from "./grading_companies/reducer";
import playersReducer from "./players/reducer";
import scrapeReducer from "./scrape/reducer";

const libraryReducer = combineReducers({
  sets: setsReducer,
  subsets: subsetsReducer,
  brands: brandsReducer,
  leagues: leagueReducer,
  series: seriesReducer,
  card: cardReducer,
  teams: teamsReducer,
  gradingCompanies: gradingCompaniesReducer,
  players: playersReducer,
  scrape: scrapeReducer,
});

export default libraryReducer;
