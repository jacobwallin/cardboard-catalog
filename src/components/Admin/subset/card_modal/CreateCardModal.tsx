import React from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../../../store/library/subsets/thunks";
import ModalBackground from "../../components/modal/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardForm from "../../card/edit_card/CardForm";

interface Props {
  handleCancel(): void;
}
export default function CreateCardModal(props: Props) {
  const dispatch = useDispatch();

  function handleFormSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number,
    playerIds: number[]
  ) {
    dispatch(createCard(name, number, rookie, teamId, playerIds));
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <h3 style={{ textAlign: "center" }}>Add New Card to Subset</h3>
        <CardForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
