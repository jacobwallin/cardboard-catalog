import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import * as Styled from "./styled";
import TransactionForm, { FormData } from "../../form/TransactionForm";
import ConfirmCards from "../../shared/confirm-cards/ConfirmCards";

interface Props {
  tradedCards: CardFormData[];
  receivedCards: CardFormData[];
  handleSubmit(data: FormData): void;
}

export default function ConfirmTrade(props: Props) {
  const { tradedCards, receivedCards, handleSubmit } = props;
  return (
    <Styled.ConfirmContainer>
      <Styled.PageTitle>Enter Trade Details</Styled.PageTitle>
      <TransactionForm handleSubmit={handleSubmit} type="TRADE" />
      <ConfirmCards
        cardsAdded={receivedCards}
        addedTitle="Cards Received"
        cardsRemoved={tradedCards}
        removedTitle="Cards Traded"
      />
    </Styled.ConfirmContainer>
  );
}
