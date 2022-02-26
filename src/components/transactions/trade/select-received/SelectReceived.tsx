import React from "react";
import { CardFormData } from "../../quick-add/AddCardsForm";
import AddCardsForm from "../../quick-add/AddCardsForm";

interface Props {
  receivedCards: CardFormData[];
  handleReceivedCardsChange(receivedCards: CardFormData[]): void;
}

export default function SelectReceived(props: Props) {
  const { receivedCards, handleReceivedCardsChange } = props;
  return (
    <AddCardsForm
      cardData={receivedCards}
      setCardData={handleReceivedCardsChange}
    />
  );
}
