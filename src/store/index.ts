import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import collectionReducer from "./collection/reducer";
import userReducer from "./user/reducer";
import libraryReducer from "./library/reducer";

const combinedReducer = combineReducers({
  collection: collectionReducer,
  user: userReducer,
  library: libraryReducer,
});

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;

export type RootState = ReturnType<typeof combinedReducer>;
