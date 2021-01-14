import { combineReducers } from "redux";

import setsReducer from "./sets/reducer";
import subsetsReducer from "./subsets/reducer";
import brandsReducer from "./brands/reducer";
import leagueReducer from "./leagues/reducer";
import attributeReducer from "./attributes/reducer";
import seriesReducer from "./series/reducer";
import cardReducer from "./card/reducer";
import teamsReducer from "./teams/reducer";

const libraryReducer = combineReducers({
  sets: setsReducer,
  subsets: subsetsReducer,
  brands: brandsReducer,
  leagues: leagueReducer,
  attributes: attributeReducer,
  series: seriesReducer,
  card: cardReducer,
  teams: teamsReducer,
});

export default libraryReducer;
