import * as types from "./types";

const initialState: types.FriendState = {
  friends: [],
  userSearch: {
    id: 0,
    username: "",
  },
};

export default function friendReducer(
  state: types.FriendState = initialState,
  action: types.FriendActions
) {
  switch (action.type) {
    case "GET_ALL_FRIENDS_SUCCESS":
      return { ...state, friends: action.friends };
    default:
      return state;
  }
}
