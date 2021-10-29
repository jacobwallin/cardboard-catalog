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

export function check401(err: Response, dispatch: any): boolean {
  if (err.status === 401) {
    dispatch({ type: "LOGOUT" });
    return false;
  }
  return true;
}

export interface LogoutActionType {
  type: "LOGOUT";
}

export type RootState = ReturnType<typeof combinedReducer>;

export default store;
