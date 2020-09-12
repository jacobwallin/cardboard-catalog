import { GET_USER, REMOVE_USER, UserActionTypes, User } from "./types";

export const getUser = (user: User): UserActionTypes => {
  return {
    type: GET_USER,
    user: user,
  };
};

export const removeUser = (): UserActionTypes => {
  return {
    type: REMOVE_USER,
  };
};
