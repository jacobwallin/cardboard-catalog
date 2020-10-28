import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getLeaguesRequest, getLeaguesSuccess } from "./actions";
import { LeaguesActionTypes } from "./types";

export const fetchLeagues = (): ThunkAction<
  void,
  RootState,
  unknown,
  LeaguesActionTypes
> => (dispatch) => {
  dispatch(getLeaguesRequest());
  fetch("/api/leagues")
    .then((response) => {
      return response.json();
    })
    .then((allLeagues) => {
      dispatch(getLeaguesSuccess(allLeagues));
    })
    .catch((error) => console.log("ERROR IN FETCH LEAGUES THUNK"));
};
