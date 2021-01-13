import { combineReducers } from "redux";

import setsReducer from "./sets/reducer";
import subsetsReducer from "./subsets/reducer";
import brandsReducer from "./brands/reducer";
import leagueReducer from "./leagues/reducer";
import attributeReducer from "./attributes/reducer"
import seriesReducer from "./series/reducer"

const libraryReducer = combineReducers({
  sets: setsReducer,
  subsets: subsetsReducer,
  brands: brandsReducer,
  leagues: leagueReducer,
  attributes: attributeReducer,
  series: seriesReducer
});

export default libraryReducer;
