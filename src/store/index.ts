import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import collectionReducer from "./collection/reducer";

const combinedReducer = combineReducers({
  collection: collectionReducer,
});

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;

export type RootState = ReturnType<typeof combinedReducer>;
