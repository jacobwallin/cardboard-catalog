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

export const scrapeNewPlayer =
  (url: string): ThunkAction<void, RootState, unknown, PlayerActionCreators> =>
  (dispatch) => {
    dispatch(actions.createPlayerRequest());
    fetch(`/api/players/scrape`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: url,
    })
      .then((response) => {
        response.json().then((ouchie) => console.log(ouchie));
        if (response.status === 500) throw new Error("ouchie");

        return response.json();
      })
      .then((newPlayer) => {
        dispatch(actions.createPlayerSuccess(newPlayer));
      })
      .catch((error) => {
        dispatch(actions.createPlayerFailure());
      });
  };
