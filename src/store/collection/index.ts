import { combineReducers } from "redux";

import browseCollectionReducer from "./browse/reducer";
import filterCollectionReducer from "./filter/reducer";
import transactionsReducer from "./transactions/reducer";

const collectionReducer = combineReducers({
  browse: browseCollectionReducer,
  filter: filterCollectionReducer,
  transactions: transactionsReducer,
});

export default collectionReducer;
