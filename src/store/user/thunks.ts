import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { UserActionTypes } from "./types";
import {
  getUserSuccess,
  getUserFailure,
  setUserFetched,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  removeUser,
} from "./actions";

export const fetchMe =
  (): ThunkAction<void, RootState, unknown, UserActionTypes> => (dispatch) => {
    fetch("/auth")
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(getUserSuccess(user));
        dispatch(setUserFetched(true));
      })
      .catch((err) => {
        dispatch(setUserFetched(true));
        console.log("ERROR IN FETCH ME THUNK");
      });
  };

export const login =
  (
    username: string,
    password: string
  ): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  (dispatch) => {
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
        dispatch(getUserSuccess(user));
        dispatch(setUserFetched(true));
      })
      .catch((err) => {
        dispatch(getUserFailure());
      });
  };

export const register =
  (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
  ): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  (dispatch) => {
    dispatch(registerUserRequest());

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, firstName, lastName }),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(registerUserSuccess());
      })
      .catch((err) => {
        // TODO: REMOVE log
        console.log("ERROR REGISTERING USER: ", err.message);
        dispatch(registerUserFailure());
      });
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, UserActionTypes> => (dispatch) => {
    fetch("/auth/logout", {
      method: "POST",
    })
      .then((response) => {
        dispatch(removeUser());
      })
      .catch((err) => console.log("ERROR LOGGING OUT"));
  };
