export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface UserState {
  userData: User;
  userFetched: boolean;
}
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const SET_USER_FETCHED = "SET_USER_FETCHED";
export const REMOVE_USER = "REMOVE_USER";

export interface GetUserRequest {
  type: typeof GET_USER_REQUEST;
}
export interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  user: User;
}

export interface GetUserFailure {
  type: typeof GET_USER_FAILURE;
}

export interface SetUserFetched {
  type: typeof SET_USER_FETCHED;
  status: boolean;
}

export interface RemoveUser {
  type: typeof REMOVE_USER;
}

export type UserActionTypes =
  | GetUserRequest
  | GetUserSuccess
  | GetUserFailure
  | SetUserFetched
  | RemoveUser;
