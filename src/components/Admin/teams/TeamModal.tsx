import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addTeam, updateTeam } from "../../../store/library/teams/thunks";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import TeamForm from "./TeamForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { Team } from "../../../store/library/teams/types";

const createTeamStatusSelector = createStatusSelector("ADD_TEAM");
const updateTeamStatusSelector = createStatusSelector("UPDATE_TEAM");

interface Props {
  dismiss(): void;
  leagueId: number;
  editTeam?: Team;
}

export default function TeamModal(props: Props) {
  const dispatch = useDispatch();

  const [teamCreatedOrUpdated, setTeamCreatedOrUpdated] = useState(false);

  const addTeamStatus = useSelector((state: RootState) =>
    createTeamStatusSelector(state)
  );
  const updateTeamStatus = useSelector((state: RootState) =>
    updateTeamStatusSelector(state)
  );

  // dismiss modal upon success
  useEffect(() => {
    if (addTeamStatus === "SUCCESS" && teamCreatedOrUpdated) {
      props.dismiss();
    }
  }, [addTeamStatus, props, teamCreatedOrUpdated]);
  useEffect(() => {
    if (updateTeamStatus === "SUCCESS" && teamCreatedOrUpdated) {
      props.dismiss();
    }
  }, [updateTeamStatus, props, teamCreatedOrUpdated]);

  function handleAddTeam(teamData: { name: string }) {
    dispatch(addTeam({ name: teamData.name, leagueId: props.leagueId }));
    setTeamCreatedOrUpdated(true);
  }

  function handleUpdateTeam(teamData: { name: string }) {
    if (props.editTeam) {
      dispatch(
        updateTeam(props.editTeam.id, {
          name: teamData.name,
          leagueId: props.leagueId,
        })
      );
      setTeamCreatedOrUpdated(true);
    }
  }

  return (
    <ModalBackground>
      <ModalWindow>
        {props.editTeam ? (
          <>
            <ModalHeader title="Add Team" handleClose={props.dismiss} />
            <TeamForm
              handleSubmit={handleUpdateTeam}
              editTeam={props.editTeam}
            />
          </>
        ) : (
          <>
            <ModalHeader title="Add Team" handleClose={props.dismiss} />
            <TeamForm handleSubmit={handleAddTeam} />
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
