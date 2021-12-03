import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { TeamsActionTypes, Team } from "./types";
import { get, post, put } from "../../../utils/fetch";

export const fetchAllTeams =
  (): ThunkAction<void, RootState, unknown, TeamsActionTypes> => (dispatch) => {
    dispatch(actions.getAllTeamsRequest());
    get("/api/teams", dispatch)
      .then((allTeams: Team[]) => {
        dispatch(actions.getAllTeamsSuccess(allTeams));
      })
      .catch((error) => {
        dispatch(actions.getAllTeamsFailure());
      });
  };

export const fetchTeamsByLeague =
  (leagueId: number): ThunkAction<void, RootState, unknown, TeamsActionTypes> =>
  (dispatch) => {
    dispatch(actions.getTeamsByLeagueRequest());
    get(`/api/teams/league/${leagueId}`, dispatch)
      .then((teams: Team[]) => {
        dispatch(actions.getTeamsByLeagueSuccess(teams));
      })
      .catch((error) => {
        dispatch(actions.getTeamsByLeagueFailure());
      });
  };

export const addTeam =
  (teamData: {
    name: string;
    leagueId: number;
  }): ThunkAction<void, RootState, unknown, TeamsActionTypes> =>
  (dispatch) => {
    dispatch(actions.addTeamRequest());

    post("/api/teams", teamData, dispatch)
      .then((newTeam: Team) => {
        dispatch(actions.addTeamSuccess(newTeam));
      })
      .catch((error) => {
        dispatch(actions.addTeamFailure());
      });
  };

export const updateTeam =
  (
    teamId: number,
    teamData: {
      name: string;
      leagueId: number;
    }
  ): ThunkAction<void, RootState, unknown, TeamsActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateTeamRequest());

    put(`/api/teams/${teamId}`, teamData, dispatch)
      .then((updatedTeam) => {
        dispatch(actions.updateTeamSuccess(updatedTeam));
      })
      .catch((error) => {
        dispatch(actions.updateTeamFailure());
      });
  };
