import { combineReducers } from "redux";

import setsReducer from "./sets/reducer";
import subsetsReducer from "./subsets/reducer";

const libraryReducer = combineReducers({
  sets: setsReducer,
  subsets: subsetsReducer,
});

export default libraryReducer;
