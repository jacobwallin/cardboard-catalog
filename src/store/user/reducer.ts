import { UserState, UserActionTypes, GET_USER, REMOVE_USER } from "./types";

const initialState: UserState = {
  id: 0,
  firstName: "",
  lastName: "",
  username: "",
  email: "",
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case GET_USER:
      return { ...action.user };
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
