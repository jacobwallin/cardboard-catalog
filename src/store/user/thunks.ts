import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { UserActionTypes } from "./types";
import * as actions from "./actions";

export const fetchMe = (): ThunkAction<void, RootState, unknown, UserActionTypes> => (dispatch) => {
  fetch("/auth")
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      dispatch(actions.getUserSuccess(user));
      dispatch(actions.setUserFetched(true));
    })
    .catch((err) => {
      dispatch(actions.setUserFetched(true));
    });
};

export const login =
  (username: string, password: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
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
        dispatch(actions.getUserSuccess(user));
        dispatch(actions.setUserFetched(true));
      })
      .catch((err) => {
        dispatch(actions.getUserFailure());
      });
  };

export const register =
  (
    username: string,
    password: string,
    email: string,
    name: string
  ): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  (dispatch) => {
    dispatch(actions.registerUserRequest());

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, name }),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(actions.registerUserSuccess(user));
      })
      .catch((err) => {
        dispatch(actions.registerUserFailure());
      });
  };

export const logout = (): ThunkAction<void, RootState, unknown, UserActionTypes> => (dispatch) => {
  fetch("/auth/logout", {
    method: "POST",
  })
    .then((response) => {
      dispatch(actions.logout());
    })
    .catch((err) => console.log("ERROR LOGGING OUT"));
};

export const checkUsername =
  (username: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  (dispatch) => {
    dispatch(actions.checkUsernameRequest());
    fetch("/auth/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(actions.checkUsernameSuccess(response));
      })
      .catch((err) => dispatch(actions.checkUsernameFailure(err.message)));
  };
export const checkEmail =
  (email: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
  (dispatch) => {
    dispatch(actions.checkEmailRequest());
    fetch("/auth/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(actions.checkEmailSuccess(response));
      })
      .catch((err) => dispatch(actions.checkEmailFailure(err.message)));
  };
