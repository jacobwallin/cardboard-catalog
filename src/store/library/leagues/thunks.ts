import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { LeaguesActionTypes } from "./types";
import { get } from "../../../utils/fetch";

export const fetchLeagues =
  (): ThunkAction<void, RootState, unknown, LeaguesActionTypes> => (dispatch) => {
    dispatch(actions.getAllLeaguesRequest());
    get("/api/leagues", dispatch)
      .then((allLeagues) => {
        dispatch(actions.getAllLeaguesSuccess(allLeagues));
      })
      .catch((error) => {
        dispatch(actions.getAllLeaguesFailure());
      });
  };
