import React from "react";
import { CardData } from "../../../../store/library/subsets/types";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import CardFormController from "../card_form/CardFormController";
import ModalHeader from "../../components/modal/ModalHeader";

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
        <ModalHeader
          title={`Edit Card ${props.cardData.number}`}
          handleClose={props.handleCancel}
        />
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
              return { ...player, createdAt: "", updatedAt: "" };
            }),
          }}
          handleClose={props.handleCancel}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
