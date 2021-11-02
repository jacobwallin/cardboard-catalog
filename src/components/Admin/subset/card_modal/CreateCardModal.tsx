import React from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../../../store/library/subsets/thunks";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardForm from "../../card/edit_card/CardForm";
import { ModalTitle } from "../styled";

interface Props {
  handleCancel(): void;
  subsetId: number;
}
export default function CreateCardModal(props: Props) {
  const dispatch = useDispatch();

  function handleFormSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number,
    note: string,
    playerIds: number[]
  ) {
    dispatch(
      createCard({
        subsetId: props.subsetId,
        name,
        number,
        rookie,
        teamId,
        note,
        playerIds,
      })
    );
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <ModalTitle>Create Card</ModalTitle>
        <CardForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
