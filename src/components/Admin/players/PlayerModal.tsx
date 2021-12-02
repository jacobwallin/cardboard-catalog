import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createPlayer,
  updatePlayer,
} from "../../../store/library/players/thunks";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import PlayerForm from "./PlayerForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { Player } from "../../../store/library/players/types";

const createPlayerStatusSelector = createStatusSelector("CREATE_PLAYER");
const updatePlayerStatusSelector = createStatusSelector("UPDATE_PLAYER");

interface Props {
  dismiss(): void;
  editPlayer?: Player;
}
export default function PlayerModal(props: Props) {
  const dispatch = useDispatch();

  const [playerCreated, setPlayerCreated] = useState(false);

  const createPlayerStatus = useSelector((state: RootState) =>
    createPlayerStatusSelector(state)
  );
  const updatePlayerStatus = useSelector((state: RootState) =>
    updatePlayerStatusSelector(state)
  );

  function createNewPlayer(playerData: {
    name: string;
    fullName: string;
    url: string;
    birthday: string;
    hallOfFame: boolean;
  }) {
    const { name, fullName, url, birthday, hallOfFame } = playerData;
    dispatch(createPlayer({ name, fullName, url, birthday, hallOfFame }));
    setPlayerCreated(true);
  }
  function editPlayer(playerData: {
    name: string;
    fullName: string;
    url: string;
    birthday: string;
    hallOfFame: boolean;
  }) {
    if (props.editPlayer) {
      const { name, fullName, url, birthday, hallOfFame } = playerData;
      dispatch(
        updatePlayer(props.editPlayer.id, {
          name,
          fullName,
          url,
          birthday,
          hallOfFame,
        })
      );
      setPlayerCreated(true);
    }
  }

  // dismiss modal upon success
  useEffect(() => {
    if (createPlayerStatus === "SUCCESS" && playerCreated) {
      props.dismiss();
    }
  }, [createPlayerStatus, props, playerCreated]);
  useEffect(() => {
    if (updatePlayerStatus === "SUCCESS" && playerCreated) {
      props.dismiss();
    }
  }, [updatePlayerStatus, props, playerCreated]);

  return (
    <ModalBackground>
      <ModalWindow>
        {props.editPlayer ? (
          <>
            <ModalHeader title="Edit Player Info" handleClose={props.dismiss} />
            <PlayerForm
              handleSubmit={editPlayer}
              editPlayer={props.editPlayer}
            />
          </>
        ) : (
          <>
            <ModalHeader title="Add New Player" handleClose={props.dismiss} />
            <PlayerForm handleSubmit={createNewPlayer} />
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
