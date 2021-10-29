import * as types from "./types";

import { Logout } from "..";

const initialState: types.UserState = {
  userData: {
    id: 0,
    name: "",
    username: "",
    email: "",
    isAdmin: false,
  },
  userFetched: false,
  availableEmail: true,
  availableUsername: true,
};

export default function userReducer(
  state = initialState,
  action: types.UserActionTypes | Logout
): types.UserState {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return { ...state, userData: action.user };
    case types.SET_USER_FETCHED:
      return { ...state, userFetched: action.status };
    case types.REGISTER_SUCCESS:
      return { ...state, userData: action.user };
    case types.CHECK_USERNAME_SUCCESS:
      return { ...state, availableUsername: action.available };
    case types.CHECK_EMAIL_SUCCESS:
      return { ...state, availableEmail: action.available };
    case "LOGOUT":
      return { ...initialState, userFetched: true };
    default:
      return state;
  }
}
