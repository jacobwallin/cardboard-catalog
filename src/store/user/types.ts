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
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGUSTER_FAILURE";
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

export interface RegisterUserRequest {
  type: typeof REGISTER_REQUEST;
}
export interface RegisterUserSuccess {
  type: typeof REGISTER_SUCCESS;
}
export interface RegisterUserFailure {
  type: typeof REGISTER_FAILURE;
}

export type UserActionTypes =
  | GetUserRequest
  | GetUserSuccess
  | GetUserFailure
  | SetUserFetched
  | RemoveUser
  | RegisterUserFailure
  | RegisterUserSuccess
  | RegisterUserRequest;
