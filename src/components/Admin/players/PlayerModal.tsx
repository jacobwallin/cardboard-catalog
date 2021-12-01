import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { createPlayer } from "../../../store/library/players/thunks";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import PlayerForm from "./PlayerForm";
import { createStatusSelector } from "../../../store/loading/reducer";

const createPlayerStatusSelector = createStatusSelector("CREATE_PLAYER");

interface Props {
  dismiss(): void;
}
export default function PlayerModal(props: Props) {
  const dispatch = useDispatch();

  const [playerCreated, setPlayerCreated] = useState(false);

  const createPlayerStatus = useSelector((state: RootState) =>
    createPlayerStatusSelector(state)
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

  // dismiss modal upon success
  useEffect(() => {
    if (createPlayerStatus === "SUCCESS" && playerCreated) {
      props.dismiss();
    }
  }, [createPlayerStatus, props, playerCreated]);

  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Add New Player" handleClose={props.dismiss} />
        <PlayerForm handleSubmit={createNewPlayer} />
      </ModalWindow>
    </ModalBackground>
  );
}
