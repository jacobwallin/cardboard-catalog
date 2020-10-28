import { combineReducers } from "redux";

import setsReducer from "./sets/reducer";
import subsetsReducer from "./subsets/reducer";
import brandsReducer from "./brands/reducer";
import leagueReducer from "./leagues/reducer";

const libraryReducer = combineReducers({
  sets: setsReducer,
  subsets: subsetsReducer,
  brands: brandsReducer,
  leagues: leagueReducer,
});

export default libraryReducer;
