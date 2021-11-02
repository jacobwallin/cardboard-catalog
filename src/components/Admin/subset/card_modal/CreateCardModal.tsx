import React from "react";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardFormController from "../../card/edit_card/CardFormController";

interface Props {
  handleCancel(): void;
  subsetId: number;
}
// TODO: automatically close on success
export default function CreateCardModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        <CardFormController
          handleClose={props.handleCancel}
          subsetId={props.subsetId}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
