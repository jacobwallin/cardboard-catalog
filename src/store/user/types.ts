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
export const SET_USER_FETCHED = "SET_USER_FETCHED";
export const REMOVE_USER = "REMOVE_USER";

export interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}
export interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  user: User;
}

export interface SetUserFetched {
  type: typeof SET_USER_FETCHED;
  status: boolean;
}

export interface RemoveUser {
  type: typeof REMOVE_USER;
}

export type UserActionTypes =
  | GetUserRequestAction
  | GetUserSuccessAction
  | SetUserFetched
  | RemoveUser;
