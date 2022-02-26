import React from "react";
import { CardFormData } from "../../quick-add/AddCardsForm";
interface Props {
  tradedCards: CardFormData[];
  handleTradedCardsChange(tradedCards: CardFormData[]): void;
}

export default function SelectTraded(props: Props) {
  return <div>select the cards you traded</div>;
}
