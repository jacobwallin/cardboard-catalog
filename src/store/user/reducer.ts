import {
  UserState,
  UserActionTypes,
  GET_USER_SUCCESS,
  SET_USER_FETCHED,
  REMOVE_USER,
} from "./types";

const initialState: UserState = {
  userData: {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    isAdmin: false,
  },
  userFetched: false,
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, userData: action.user };
    case SET_USER_FETCHED:
      return { ...state, userFetched: action.status };
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
