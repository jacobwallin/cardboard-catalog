import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getAllTeamsRequest, getAllTeamsSuccess } from "./actions";
import { TeamsActionTypes } from "./types";

export const fetchAllTeams = (): ThunkAction<
  void,
  RootState,
  unknown,
  TeamsActionTypes
> => (dispatch) => {
  dispatch(getAllTeamsRequest());
  fetch("/api/teams")
    .then((response) => {
      return response.json();
    })
    .then((allBrands) => {
      dispatch(getAllTeamsSuccess(allBrands));
    })
    .catch((error) => console.log(error.message));
};
