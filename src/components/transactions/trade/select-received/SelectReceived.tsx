import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import AddCardsForm from "../../select-cards-form/AddCardsForm";
import { CardData } from "../../../../store/collection/browse/types";

interface Props {
  receivedCards: CardFormData[];
  handleReceivedCardsChange(receivedCards: CardFormData[]): void;
  submit(cardData: CardData[]): void;
}

export default function SelectReceived(props: Props) {
  const { receivedCards, handleReceivedCardsChange, submit } = props;
  return (
    <>
      <AddCardsForm
        selectFrom="DATABASE"
        cardData={receivedCards}
        setCardData={handleReceivedCardsChange}
        submit={submit}
        title="Select Cards You Received"
      />
    </>
  );
}
