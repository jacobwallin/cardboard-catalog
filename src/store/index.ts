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

// Reset all reducers on logout (or 401)
const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: any) => {
  if (action.type === "LOGOUT") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk, createLogger({ collapsed: true })));

export default store;

export type RootState = ReturnType<typeof combinedReducer>;

export interface Logout {
  type: "LOGOUT";
}

export const logout = (): Logout => ({
  type: "LOGOUT",
});
