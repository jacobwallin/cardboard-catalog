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
    case "SEND_FRIEND_REQUEST_SUCCESS":
      return { ...state, friends: [...state.friends, action.friendship] };
    case "ACCEPT_FRIEND_REQUEST_SUCCESS":
      return {
        ...state,
        friends: state.friends.map((f) => {
          if (f.id === action.friendship.id) return action.friendship;
          return f;
        }),
      };
    case "REJECT_FRIEND_REQUEST_SUCCESS":
      // TODO: make this work
      return state;
    case "SEARCH_USERNAME_SUCCESS":
      return { ...state, userSearch: action.user };
    default:
      return state;
  }
}
