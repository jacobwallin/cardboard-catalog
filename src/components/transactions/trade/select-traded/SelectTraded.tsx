import React from "react";
import AddCardsForm from "../../select-cards-form/AddCardsForm";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
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
        canEditSelectedCards={false}
        title="Select Cards You Traded"
      />
    </>
  );
}
