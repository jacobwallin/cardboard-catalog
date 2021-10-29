import { ThunkAction } from "redux-thunk";
import { PlayerActionCreators } from "./types";
import { RootState } from "../..";
import * as actions from "./actions";
import { get, post } from "../../../utils/fetch";

export const fetchAllPlayers =
  (): ThunkAction<void, RootState, unknown, PlayerActionCreators> => (dispatch) => {
    dispatch(actions.getAllPlayersRequest());
    get(`/api/players`, dispatch)
      .then((allPlayers) => {
        dispatch(actions.getAllPlayersSuccess(allPlayers));
      })
      .catch((error) => {
        dispatch(actions.getAllPlayersFailure());
      });
  };

export const scrapeNewPlayer =
  (url: string): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.createPlayerRequest());
    post(`/api/players/scrape`, url, dispatch)
      .then((newPlayer) => {
        dispatch(actions.createPlayerSuccess(newPlayer));
      })
      .catch((error) => {
        dispatch(actions.createPlayerFailure());
      });
  };
