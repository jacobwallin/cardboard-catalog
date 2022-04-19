import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import * as actions from "./actions";
import * as types from "./types";
import { get, post, put, del } from "../../utils/fetch";

export const fetchAllFriends =
  (): ThunkAction<void, RootState, unknown, types.FriendActions> =>
  (dispatch) => {
    dispatch(actions.getAllFriendsRequest());
    get(`/api/friends`, dispatch)
      .then((payload) => {
        dispatch(actions.getAllFriendsSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getAllFriendsFailure());
      });
  };

export const sendFriendRequest =
  (
    userId: number
  ): ThunkAction<void, RootState, unknown, types.FriendActions> =>
  (dispatch) => {
    dispatch(actions.sendFriendRequest());
    post(`/api/friends`, { userId }, dispatch)
      .then((payload) => {
        dispatch(actions.sendFriendSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.sendFriendFailure());
      });
  };

export const acceptFriendRequest =
  (
    friendshipId: number
  ): ThunkAction<void, RootState, unknown, types.FriendActions> =>
  (dispatch) => {
    dispatch(actions.acceptFriendRequest());
    put(`/api/friends/${friendshipId}`, {}, dispatch)
      .then((payload) => {
        dispatch(actions.acceptFriendSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.acceptFriendFailure());
      });
  };

export const deleteFriendship =
  (
    friendshipId: number
  ): ThunkAction<void, RootState, unknown, types.FriendActions> =>
  (dispatch) => {
    dispatch(actions.rejectFriendRequest());
    del(`/api/friends/${friendshipId}`, dispatch)
      .then((payload) => {
        dispatch(actions.rejectFriendSuccess());
      })
      .catch((err) => {
        dispatch(actions.rejectFriendFailure());
      });
  };

export const searchUsername =
  (
    username: string
  ): ThunkAction<void, RootState, unknown, types.FriendActions> =>
  (dispatch) => {
    dispatch(actions.searchUsernameRequest());
    get(`/api/friends/search/?username=${username}`, dispatch)
      .then((payload) => {
        dispatch(actions.searchUsernameSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.searchUsernameFailure());
      });
  };
