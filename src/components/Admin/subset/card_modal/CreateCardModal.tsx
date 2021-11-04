import React from "react";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardFormController from "../card_form/CardFormController";
import ModalHeader from "../../components/modal/ModalHeader";

interface Props {
  handleCancel(): void;
  subsetId: number;
}
// TODO: automatically close on success
export default function CreateCardModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Create New Card" handleClose={props.handleCancel} />
        <CardFormController
          handleClose={props.handleCancel}
          subsetId={props.subsetId}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
