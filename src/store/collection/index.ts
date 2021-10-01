import { combineReducers } from "redux";

import browseCollectionReducer from "./browse/reducer";
import filterCollectionReducer from "./filter/reducer";

const collectionReducer = combineReducers({
  browse: browseCollectionReducer,
  filter: filterCollectionReducer,
});

export default collectionReducer;
