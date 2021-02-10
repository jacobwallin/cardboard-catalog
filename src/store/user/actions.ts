import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_USER_FETCHED,
  REMOVE_USER,
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

export const setUserFetched = (status: boolean): UserActionTypes => ({
  type: SET_USER_FETCHED,
  status,
});

export const removeUser = (): UserActionTypes => ({
  type: REMOVE_USER,
});