import React from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../../../store/library/subsets/thunks";
import { CardData } from "../../../../store/library/subsets/types";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardForm from "../../card/edit_card/CardForm";

interface Props {
  cardData: CardData;
  handleCancel(): void;
}

export default function EditCardModal(props: Props) {
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
      updateCard(props.cardData.id, {
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
        <h3 style={{ textAlign: "center" }}>Update Card</h3>
        <CardForm
          createNew={true}
          bulkAddData={{
            name: props.cardData.name,
            number: props.cardData.number,
            rookie: props.cardData.rookie,
            note: props.cardData.note,
            teamId: props.cardData.teamId ? props.cardData.teamId : undefined,
            players: props.cardData.players.map((player) => {
              return { ...player, createdAt: "", updatedAt: "", url: "" };
            }),
          }}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
