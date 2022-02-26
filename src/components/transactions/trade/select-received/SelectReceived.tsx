import React from "react";
import { CardFormData } from "../../quick-add/AddCardsForm";
import AddCardsForm from "../../quick-add/AddCardsForm";
import { CardData } from "../../../../store/collection/browse/types";

interface Props {
  receivedCards: CardFormData[];
  handleReceivedCardsChange(receivedCards: CardFormData[]): void;
  submit(cardData: CardData[]): void;
}

export default function SelectReceived(props: Props) {
  const { receivedCards, handleReceivedCardsChange, submit } = props;
  return (
    <AddCardsForm
      cardData={receivedCards}
      setCardData={handleReceivedCardsChange}
      submit={submit}
    />
  );
}
