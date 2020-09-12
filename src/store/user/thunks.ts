import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { UserActionTypes, User } from "./types";
import { getUser, removeUser } from "./actions";

export const fetchMe = (): ThunkAction<
  void,
  RootState,
  unknown,
  UserActionTypes
> => (dispatch) => {
  fetch("/auth")
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      dispatch(getUser(user));
    })
    .catch((err) => console.log("ERROR IN FETCH ME THUNK"));
};

export const login = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, UserActionTypes> => (dispatch) => {
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      dispatch(getUser(user));
    })
    .catch((err) => console.log("ERROR IN LOGIN THUNK"));
};

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  UserActionTypes
> => (dispatch) => {
  fetch("/auth/logout", {
    method: "POST",
  })
    .then((response) => {
      dispatch(removeUser());
    })
    .catch((err) => console.log("ERROR LOGGING OUT"));
};
