import * as types from "./types";

export const getAllPlayersRequest = (): types.PlayerActionCreators => ({
  type: types.GET_ALL_PLAYERS_REQUEST,
});
export const getAllPlayersSuccess = (
  players: types.PlayersState
): types.PlayerActionCreators => ({
  type: types.GET_ALL_PLAYERS_SUCCESS,
  players,
});
export const getAllPlayersFailure = (): types.PlayerActionCreators => ({
  type: types.GET_ALL_PLAYERS_FAILURE,
});
