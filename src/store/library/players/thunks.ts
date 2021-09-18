import { ThunkAction } from "redux-thunk";
import { PlayerActionCreators } from "./types";
import { RootState } from "../..";
import * as actions from "./actions";

export const fetchAllPlayers =
  (): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.getAllPlayersRequest());
    fetch(`/api/players`)
      .then((response) => {
        return response.json();
      })
      .then((allPlayers) => {
        dispatch(actions.getAllPlayersSuccess(allPlayers));
      })
      .catch((error) => {
        dispatch(actions.getAllPlayersFailure());
      });
  };
