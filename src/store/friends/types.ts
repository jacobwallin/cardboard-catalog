export const GET_ALL_FRIENDS_REQUEST = "GET_ALL_FRIENDS_REQUEST";
export const GET_ALL_FRIENDS_SUCCESS = "GET_ALL_FRIENDS_SUCCESS";
export const GET_ALL_FRIENDS_FAILURE = "GET_ALL_FRIENDS_FAILURE";
export const SEND_FRIEND_REQUEST_REQUEST = "SEND_FRIEND_REQUEST_REQUEST";
export const SEND_FRIEND_REQUEST_SUCCESS = "SEND_FRIEND_REQUEST_SUCCESS";
export const SEND_FRIEND_REQUEST_FAILURE = "SEND_FRIEND_REQUEST_FAILURE";
export const ACCEPT_FRIEND_REQUEST_REQUEST = "ACCEPT_FRIEND_REQUEST_REQUEST";
export const ACCEPT_FRIEND_REQUEST_SUCCESS = "ACCEPT_FRIEND_REQUEST_SUCCESS";
export const ACCEPT_FRIEND_REQUEST_FAILURE = "ACCEPT_FRIEND_REQUEST_FAILURE";
export const REJECT_FRIEND_REQUEST_REQUEST = "REJECT_FRIEND_REQUEST_REQUEST";
export const REJECT_FRIEND_REQUEST_SUCCESS = "REJECT_FRIEND_REQUEST_SUCCESS";
export const REJECT_FRIEND_REQUEST_FAILURE = "REJECT_FRIEND_REQUEST_FAILURE";
export const SEARCH_USERNAME_REQUEST = "SEARCH_USERNAME_REQUEST";
export const SEARCH_USERNAME_SUCCESS = "SEARCH_USERNAME_SUCCESS";
export const SEARCH_USERNAME_FAILURE = "SEARCH_USERNAME_FAILURE";
export const CLEAR_SEARCH_USER = "CLEAR_SEARCH_USER";

interface GetAllFriendsRequest {
  type: typeof GET_ALL_FRIENDS_REQUEST;
}
interface GetAllFriendsSuccess {
  type: typeof GET_ALL_FRIENDS_SUCCESS;
  friends: Friendship[];
}
interface GetAllFriendsFailure {
  type: typeof GET_ALL_FRIENDS_FAILURE;
}

interface SendFriendRequestRequest {
  type: typeof SEND_FRIEND_REQUEST_REQUEST;
}
interface SendFriendRequestSuccess {
  type: typeof SEND_FRIEND_REQUEST_SUCCESS;
  friendship: Friendship;
}
interface SendFriendRequestFailure {
  type: typeof SEND_FRIEND_REQUEST_FAILURE;
}
interface AcceptFriendRequestRequest {
  type: typeof ACCEPT_FRIEND_REQUEST_REQUEST;
}
interface AcceptFriendRequestSuccess {
  type: typeof ACCEPT_FRIEND_REQUEST_SUCCESS;
  friendship: Friendship;
}
interface AcceptFriendRequestFailure {
  type: typeof ACCEPT_FRIEND_REQUEST_FAILURE;
}
interface RejectFriendRequestRequest {
  type: typeof REJECT_FRIEND_REQUEST_REQUEST;
}
interface RejectFriendRequestSuccess {
  type: typeof REJECT_FRIEND_REQUEST_SUCCESS;
}
interface RejectFriendRequestFailure {
  type: typeof REJECT_FRIEND_REQUEST_FAILURE;
}

interface SearchUsernameRequest {
  type: typeof SEARCH_USERNAME_REQUEST;
}
interface SearchUsernameSuccess {
  type: typeof SEARCH_USERNAME_SUCCESS;
  user: UserSearch;
}
interface SearchUsernameFailure {
  type: typeof SEARCH_USERNAME_FAILURE;
}
interface ClearSearchUser {
  type: typeof CLEAR_SEARCH_USER;
}

export type FriendActions =
  | GetAllFriendsRequest
  | GetAllFriendsSuccess
  | GetAllFriendsFailure
  | SearchUsernameRequest
  | SearchUsernameSuccess
  | SearchUsernameFailure
  | SendFriendRequestRequest
  | SendFriendRequestSuccess
  | SendFriendRequestFailure
  | AcceptFriendRequestRequest
  | AcceptFriendRequestSuccess
  | AcceptFriendRequestFailure
  | RejectFriendRequestRequest
  | RejectFriendRequestSuccess
  | RejectFriendRequestFailure
  | ClearSearchUser;

export type FriendState = {
  friendships: Friendship[];
  userSearch: UserSearch;
};

export interface Friendship {
  id: number;
  user_one_id: number;
  user_two_id: number;
  status: "PENDING" | "ACCEPTED";
  user_one: UserDetails;
  user_two: UserDetails;
}

interface UserDetails {
  id: number;
  username: string;
}

export interface UserSearch {
  id: number;
  username: string;
}
