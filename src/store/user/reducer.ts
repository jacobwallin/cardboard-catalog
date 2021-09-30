import {
  UserState,
  UserActionTypes,
  GET_USER_SUCCESS,
  SET_USER_FETCHED,
  REGISTER_SUCCESS,
  REMOVE_USER,
  CHECK_EMAIL_SUCCESS,
  CHECK_USERNAME_SUCCESS,
} from "./types";

const initialState: UserState = {
  userData: {
    id: 0,
    name: "",
    username: "",
    email: "",
    isAdmin: false,
  },
  userFetched: false,
  availableEmail: true,
  availableUsername: true,
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
    case REGISTER_SUCCESS:
      return { ...state, userData: action.user };
    case CHECK_USERNAME_SUCCESS:
      return { ...state, availableUsername: action.available };
    case CHECK_EMAIL_SUCCESS:
      return { ...state, availableEmail: action.available };
    case REMOVE_USER:
      return { ...initialState, userFetched: true };
    default:
      return state;
  }
}
