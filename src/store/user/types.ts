export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface UserState {
  userData: User;
  userFetched: boolean;
  sessionExpired: boolean;
  availableEmail: boolean;
  availableUsername: boolean;
}

// ACTION TYPES
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const SET_USER_FETCHED = "SET_USER_FETCHED";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGUSTER_FAILURE";
export const CHECK_USERNAME_REQUEST = "CHECK_USERNAME_REQUEST";
export const CHECK_USERNAME_SUCCESS = "CHECK_USERNAME_SUCCESS";
export const CHECK_USERNAME_FAILURE = "CHECK_USERNAME_FAILURE";
export const CHECK_EMAIL_REQUEST = "CHECK_EMAIL_REQUEST";
export const CHECK_EMAIL_SUCCESS = "CHECK_EMAIL_SUCCESS";
export const CHECK_EMAIL_FAILURE = "CHECK_EMAIL_FAILURE";
export const LOGOUT = "LOGOUT";

// ACTION CREATOR INTERFACES
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

export interface Logout {
  type: typeof LOGOUT;
}

export interface RegisterUserRequest {
  type: typeof REGISTER_REQUEST;
}
export interface RegisterUserSuccess {
  type: typeof REGISTER_SUCCESS;
  user: User;
}
export interface RegisterUserFailure {
  type: typeof REGISTER_FAILURE;
}

export interface CheckUsernameRequest {
  type: typeof CHECK_USERNAME_REQUEST;
}
export interface CheckUsernameSuccess {
  type: typeof CHECK_USERNAME_SUCCESS;
  available: boolean;
}
export interface CheckUsernameFailure {
  type: typeof CHECK_USERNAME_FAILURE;
  message: string;
}

export interface CheckEmailRequest {
  type: typeof CHECK_EMAIL_REQUEST;
}
export interface CheckEmailSuccess {
  type: typeof CHECK_EMAIL_SUCCESS;
  available: boolean;
}
export interface CheckEmailFailure {
  type: typeof CHECK_EMAIL_FAILURE;
  message: string;
}

export type UserActionTypes =
  | GetUserRequest
  | GetUserSuccess
  | GetUserFailure
  | SetUserFetched
  | Logout
  | RegisterUserFailure
  | RegisterUserSuccess
  | RegisterUserRequest
  | CheckUsernameRequest
  | CheckUsernameSuccess
  | CheckUsernameFailure
  | CheckEmailRequest
  | CheckEmailSuccess
  | CheckEmailFailure;
