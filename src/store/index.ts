import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import collectionReducer from "./collection/";
import userReducer from "./user/reducer";
import libraryReducer from "./library";
import loadingReducer from "./loading/reducer";

const combinedReducer = combineReducers({
  collection: collectionReducer,
  user: userReducer,
  library: libraryReducer,
  loading: loadingReducer,
});

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;

export type RootState = ReturnType<typeof combinedReducer>;
