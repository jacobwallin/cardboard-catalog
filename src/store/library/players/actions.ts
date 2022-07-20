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

export const createPlayerRequest = (): types.PlayerActionCreators => ({
  type: types.CREATE_PLAYER_REQUEST,
});
export const createPlayerSuccess = (
  player: types.Player
): types.PlayerActionCreators => ({
  type: types.CREATE_PLAYER_SUCCESS,
  player,
});
export const createPlayerFailure = (): types.PlayerActionCreators => ({
  type: types.CREATE_PLAYER_FAILURE,
});

export const updatePlayerRequest = (): types.PlayerActionCreators => ({
  type: types.UPDATE_PLAYER_REQUEST,
});
export const updatePlayerSuccess = (
  player: types.Player
): types.PlayerActionCreators => ({
  type: types.UPDATE_PLAYER_SUCCESS,
  player,
});
export const updatePlayerFailure = (): types.PlayerActionCreators => ({
  type: types.UPDATE_PLAYER_FAILURE,
});

export const bulkCreatePlayerRequest = (): types.PlayerActionCreators => ({
  type: types.BULK_CREATE_PLAYER_REQUEST,
});
export const bulkCreatePlayerSuccess = (
  players: types.Player[]
): types.PlayerActionCreators => ({
  type: types.BULK_CREATE_PLAYER_SUCCESS,
  players,
});
export const bulkCreatePlayerFailure = (): types.PlayerActionCreators => ({
  type: types.BULK_CREATE_PLAYER_FAILURE,
});

export const clearPlayers = () => ({
  type: types.CLEAR_PLAYERS,
});
