import React from "react";
import { CardData } from "../../../../store/library/subsets/types";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardFormController from "../../card/edit_card/CardFormController";

interface Props {
  cardData: CardData;
  subsetId: number;
  handleCancel(): void;
}
// TODO: automatically close on success
export default function EditCardModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        <CardFormController
          subsetId={props.subsetId}
          editCardData={{
            cardDataId: props.cardData.id,
            name: props.cardData.name,
            number: props.cardData.number,
            rookie: props.cardData.rookie,
            note: props.cardData.note,
            teamId: props.cardData.teamId ? props.cardData.teamId : undefined,
            players: props.cardData.players.map((player) => {
              return { ...player, createdAt: "", updatedAt: "", url: "" };
            }),
          }}
          handleClose={props.handleCancel}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
