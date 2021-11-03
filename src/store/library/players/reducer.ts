import * as types from "./types";

const initialState: types.PlayersState = [];

export default function playersReducer(
  state: types.PlayersState = initialState,
  action: types.PlayerActionCreators
) {
  switch (action.type) {
    case types.GET_ALL_PLAYERS_SUCCESS:
      return action.players;
    case types.CREATE_PLAYER_SUCCESS:
      return [...state, action.player];
    case types.BULK_CREATE_PLAYER_SUCCESS:
      return [...state, ...action.players];
    default:
      return state;
  }
}
