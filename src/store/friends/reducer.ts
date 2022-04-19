import * as types from "./types";

const initialState: types.FriendState = {
  friendships: [],
  userSearch: {
    user: {
      id: 0,
      username: "",
    },
    existingFriendship: null,
  },
};

export default function friendReducer(
  state: types.FriendState = initialState,
  action: types.FriendActions
) {
  switch (action.type) {
    case "GET_ALL_FRIENDS_SUCCESS":
      return { ...state, friendships: action.friends };
    case "SEND_FRIEND_REQUEST_SUCCESS":
      return {
        ...state,
        friendships: [...state.friendships, action.friendship],
      };
    case "ACCEPT_FRIEND_REQUEST_SUCCESS":
      return {
        ...state,
        friendships: state.friendships.map((f) => {
          if (f.id === action.friendship.id) return action.friendship;
          return f;
        }),
      };
    case "REJECT_FRIEND_REQUEST_SUCCESS":
      return {
        ...state,
        friendships: state.friendships.filter(
          (f) => f.id !== action.friendshipId
        ),
      };
    case "SEARCH_USERNAME_SUCCESS":
      return { ...state, userSearch: action.user };
    case "SEARCH_USERNAME_FAILURE":
      return { ...state, userSearch: initialState.userSearch };
    case "CLEAR_SEARCH_USER":
      return { ...state, userSearch: initialState.userSearch };
    default:
      return state;
  }
}
