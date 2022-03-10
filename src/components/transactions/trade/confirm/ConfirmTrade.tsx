import React from "react";
import { CardData } from "../../../../store/collection/browse/types";
import { CardFormData } from "../../quick-add/AddCardsForm";

interface Props {
  tradedCards: CardFormData[];
  receivedCards: CardFormData[];
}

export default function ConfirmTrade(props: Props) {
  const { tradedCards, receivedCards } = props;
  return (
    <>
      <div>enter trade details and confirm cards traded and received.</div>
      <p>traded cards: </p>
      {tradedCards.map((card) => {
        return <div>{card.card.card_datum.name}</div>;
      })}
      <p>received cards: </p>
      {receivedCards.map((card) => {
        return <div>{card.card.card_datum.name}</div>;
      })}
    </>
  );
}
