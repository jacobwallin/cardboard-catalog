import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_USER_FETCHED,
  REMOVE_USER,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UserActionTypes,
  User,
} from "./types";

export const getUserRequest = (): UserActionTypes => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user: User): UserActionTypes => ({
  type: GET_USER_SUCCESS,
  user: user,
});

export const getUserFailure = (): UserActionTypes => ({
  type: GET_USER_FAILURE,
});

export const setUserFetched = (status: boolean): UserActionTypes => ({
  type: SET_USER_FETCHED,
  status,
});

export const removeUser = (): UserActionTypes => ({
  type: REMOVE_USER,
});

export const registerUserRequest = (): { type: typeof REGISTER_REQUEST } => ({
  type: REGISTER_REQUEST,
});

export const registerUserSuccess = (): { type: typeof REGISTER_SUCCESS } => ({
  type: REGISTER_SUCCESS,
});

export const registerUserFailure = (): { type: typeof REGISTER_FAILURE } => ({
  type: REGISTER_FAILURE,
});
