import React from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../../../store/library/subsets/thunks";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardForm from "../../card/edit_card/CardForm";

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
        <h3 style={{ textAlign: "center", position: "relative" }}>
          Create Card
        </h3>
        <CardForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
