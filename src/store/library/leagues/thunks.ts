import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { LeaguesActionTypes } from "./types";

export const fetchLeagues =
  (): ThunkAction<void, RootState, unknown, LeaguesActionTypes> =>
  (dispatch) => {
    dispatch(actions.getAllLeaguesRequest());
    fetch("/api/leagues")
      .then((response) => {
        return response.json();
      })
      .then((allLeagues) => {
        dispatch(actions.getAllLeaguesSuccess(allLeagues));
      })
      .catch((error) => dispatch(actions.getAllLeaguesFailure()));
  };
