import React from "react";
import ModalBackground from "../../shared/Background";
import ModalWindow from "../components/modal/ModalWindow";
import ModalHeader from "../components/modal/ModalHeader";
import PlayerForm from "./PlayerForm";

interface Props {
  dismiss(): void;
}
export default function PlayerModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Add New Player" handleClose={props.dismiss} />
        <PlayerForm />
      </ModalWindow>
    </ModalBackground>
  );
}
