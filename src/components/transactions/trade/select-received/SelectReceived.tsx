import React from "react";
import { CardFormData } from "../../quick-add/AddCardsForm";
interface Props {
  receivedCards: CardFormData[];
  handleReceivedCardsChange(receivedCards: CardFormData[]): void;
}

export default function SelectReceived(props: Props) {
  return <div>select the cards you received</div>;
}
