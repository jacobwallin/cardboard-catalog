import React from "react";
import { CardFormData } from "../../quick-add/AddCardsForm";
import { CardData } from "../../../../store/collection/browse/types";
interface Props {
  tradedCards: CardFormData[];
  handleTradedCardsChange(tradedCards: CardFormData[]): void;
  submit(cardData: CardData[]): void;
}

export default function SelectTraded(props: Props) {
  return <div>select the cards you traded</div>;
}
