import { ThunkAction } from "redux-thunk";
import { PlayerActionCreators } from "./types";
import { RootState } from "../..";
import * as actions from "./actions";
import { get, postString, post } from "../../../utils/fetch";

export const fetchAllPlayers =
  (): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.getAllPlayersRequest());
    get(`/api/players`, dispatch)
      .then((allPlayers) => {
        dispatch(actions.getAllPlayersSuccess(allPlayers));
      })
      .catch((error) => {
        dispatch(actions.getAllPlayersFailure());
      });
  };

export const createPlayer =
  (playerData: {
    name: string;
    fullName: string;
    url: string;
    birthday: string;
    hallOfFame: boolean;
  }): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.createPlayerRequest());
    post(`/api/players/`, playerData, dispatch)
      .then((newPlayer) => {
        dispatch(actions.createPlayerSuccess(newPlayer));
      })
      .catch((error) => {
        dispatch(actions.createPlayerFailure());
      });
  };

export const scrapeNewPlayer =
  (url: string): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.createPlayerRequest());
    postString(`/api/players/scrape`, url, dispatch)
      .then((newPlayer) => {
        dispatch(actions.createPlayerSuccess(newPlayer));
      })
      .catch((error) => {
        dispatch(actions.createPlayerFailure());
      });
  };

export const bulkScrapePlayers =
  (
    playerNames: string[]
  ): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.bulkCreatePlayerRequest());
    post(`/api/players/scrape/bulk`, { playerNames }, dispatch)
      .then((newPlayers) => {
        dispatch(actions.bulkCreatePlayerSuccess(newPlayers));
      })
      .catch((error) => {
        dispatch(actions.bulkCreatePlayerFailure());
      });
  };
