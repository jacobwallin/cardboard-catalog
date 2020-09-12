export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type UserState = User;

export const GET_USER = "GET_USER";
export const REMOVE_USER = "REMOVE_USER";

export interface GetUserAction {
  type: typeof GET_USER;
  user: User;
}

export interface RemoveUser {
  type: typeof REMOVE_USER;
}

export type UserActionTypes = GetUserAction | RemoveUser;
