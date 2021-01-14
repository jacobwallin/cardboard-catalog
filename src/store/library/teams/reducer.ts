import { GET_ALL_TEAMS_SUCCESS, TeamsState, TeamsActionTypes } from "./types";

export default function (state: TeamsState = [], action: TeamsActionTypes) {
  switch (action.type) {
    case GET_ALL_TEAMS_SUCCESS:
      return action.allTeams;
    default:
      return state;
  }
}
