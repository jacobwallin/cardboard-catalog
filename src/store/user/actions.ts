import { UserActionTypes } from "./types";

import * as types from "./types";

export const getUserRequest = (): UserActionTypes => ({
  type: types.GET_USER_REQUEST,
});

export const getUserSuccess = (user: types.User): UserActionTypes => ({
  type: types.GET_USER_SUCCESS,
  user: user,
});

export const getUserFailure = (): UserActionTypes => ({
  type: types.GET_USER_FAILURE,
});

export const setUserFetched = (status: boolean): UserActionTypes => ({
  type: types.SET_USER_FETCHED,
  status,
});

export const removeUser = (): UserActionTypes => ({
  type: types.REMOVE_USER,
});

export const registerUserRequest = (): UserActionTypes => ({
  type: types.REGISTER_REQUEST,
});

export const registerUserSuccess = (): UserActionTypes => ({
  type: types.REGISTER_SUCCESS,
});

export const registerUserFailure = (): UserActionTypes => ({
  type: types.REGISTER_FAILURE,
});

export const checkUsernameRequest = (): UserActionTypes => ({
  type: types.CHECK_USERNAME_REQUEST,
});
export const checkUsernameSuccess = (available: boolean): UserActionTypes => ({
  type: types.CHECK_USERNAME_SUCCESS,
  available,
});
export const checkUsernameFailure = (message: string): UserActionTypes => ({
  type: types.CHECK_USERNAME_FAILURE,
  message,
});
export const checkEmailRequest = (): UserActionTypes => ({
  type: types.CHECK_EMAIL_REQUEST,
});
export const checkEmailSuccess = (available: boolean): UserActionTypes => ({
  type: types.CHECK_EMAIL_SUCCESS,
  available,
});
export const checkEmailFailure = (message: string): UserActionTypes => ({
  type: types.CHECK_EMAIL_FAILURE,
  message,
});
