import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { TeamsActionTypes } from "./types";
import { get } from "../../../utils/fetch";

export const fetchAllTeams =
  (): ThunkAction<void, RootState, unknown, TeamsActionTypes> => (dispatch) => {
    dispatch(actions.getAllTeamsRequest());
    get("/api/teams", dispatch)
      .then((allBrands) => {
        dispatch(actions.getAllTeamsSuccess(allBrands));
      })
      .catch((error) => {
        dispatch(actions.getAllTeamsFailure());
      });
  };
