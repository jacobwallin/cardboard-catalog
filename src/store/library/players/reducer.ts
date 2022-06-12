import * as types from "./types";

const initialState: types.PlayersState = {
  rows: [],
  count: 0,
};

export default function playersReducer(
  state: types.PlayersState = initialState,
  action: types.PlayerActionCreators
) {
  switch (action.type) {
    case types.GET_ALL_PLAYERS_SUCCESS:
      return action.players;
    case types.CREATE_PLAYER_SUCCESS:
      return {
        rows: [action.player, ...state.rows],
        count: state.count + 1,
      };
    case types.UPDATE_PLAYER_SUCCESS:
      return {
        rows: state.rows.map((p) => {
          if (p.id === action.player.id) {
            return action.player;
          }
          return p;
        }),
        count: state.count,
      };
    case types.BULK_CREATE_PLAYER_SUCCESS:
      return {
        rows: [...state.rows, ...action.players],
        count: state.count + action.players.length,
      };
    default:
      return state;
  }
}
