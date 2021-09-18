import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { TeamsActionTypes } from "./types";

export const fetchAllTeams =
  (): ThunkAction<void, RootState, unknown, TeamsActionTypes> => (dispatch) => {
    dispatch(actions.getAllTeamsRequest());
    fetch("/api/teams")
      .then((response) => {
        return response.json();
      })
      .then((allBrands) => {
        dispatch(actions.getAllTeamsSuccess(allBrands));
      })
      .catch((error) => {
        dispatch(actions.getAllTeamsFailure());
      });
  };
