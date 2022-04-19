import * as types from "./types";

export const getAllFriendsRequest = (): types.FriendActions => ({
  type: types.GET_ALL_FRIENDS_REQUEST,
});
export const getAllFriendsSuccess = (
  friends: types.Friendship[]
): types.FriendActions => ({
  type: types.GET_ALL_FRIENDS_SUCCESS,
  friends,
});
export const getAllFriendsFailure = (): types.FriendActions => ({
  type: types.GET_ALL_FRIENDS_FAILURE,
});

export const searchUsernameRequest = (): types.FriendActions => ({
  type: types.SEARCH_USERNAME_REQUEST,
});
export const searchUsernameSuccess = (
  user: types.UserSearch
): types.FriendActions => ({
  type: types.SEARCH_USERNAME_SUCCESS,
  user,
});
export const searchUsernameFailure = (): types.FriendActions => ({
  type: types.SEARCH_USERNAME_FAILURE,
});

export const sendFriendRequest = (): types.FriendActions => ({
  type: types.SEND_FRIEND_REQUEST_REQUEST,
});
export const sendFriendSuccess = (
  friendship: types.Friendship
): types.FriendActions => ({
  type: types.SEND_FRIEND_REQUEST_SUCCESS,
  friendship,
});
export const sendFriendFailure = (): types.FriendActions => ({
  type: types.SEND_FRIEND_REQUEST_FAILURE,
});

export const acceptFriendRequest = (): types.FriendActions => ({
  type: types.ACCEPT_FRIEND_REQUEST_REQUEST,
});
export const acceptFriendSuccess = (
  friendship: types.Friendship
): types.FriendActions => ({
  type: types.ACCEPT_FRIEND_REQUEST_SUCCESS,
  friendship,
});
export const acceptFriendFailure = (): types.FriendActions => ({
  type: types.ACCEPT_FRIEND_REQUEST_FAILURE,
});

export const rejectFriendRequest = (): types.FriendActions => ({
  type: types.REJECT_FRIEND_REQUEST_REQUEST,
});
export const rejectFriendSuccess = (): types.FriendActions => ({
  type: types.REJECT_FRIEND_REQUEST_SUCCESS,
});
export const rejectFriendFailure = (): types.FriendActions => ({
  type: types.REJECT_FRIEND_REQUEST_SUCCESS,
});

export const clearSearchUser = (): types.FriendActions => ({
  type: types.CLEAR_SEARCH_USER,
});
