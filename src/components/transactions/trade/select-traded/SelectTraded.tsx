import React from "react";
import AddCardsForm from "../../quick-add/AddCardsForm";
import { CardFormData } from "../../quick-add/AddCardsForm";
import { CardData } from "../../../../store/collection/browse/types";
interface Props {
  tradedCards: CardFormData[];
  handleTradedCardsChange(tradedCards: CardFormData[]): void;
  submit(cardData: CardData[]): void;
}

export default function SelectTraded(props: Props) {
  const { tradedCards, handleTradedCardsChange, submit } = props;
  return (
    <>
      <AddCardsForm
        selectFrom="COLLECTION"
        cardData={tradedCards}
        setCardData={handleTradedCardsChange}
        submit={submit}
        title="Select Cards You Traded"
      />
    </>
  );
}
