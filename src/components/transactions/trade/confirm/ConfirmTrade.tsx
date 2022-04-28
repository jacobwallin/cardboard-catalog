import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import * as Styled from "./styled";
import SelectedCards from "../../select-cards-form/selected-cards/SelectedCards";
import TransactionForm, { FormData } from "../../form/TransactionForm";

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
      <Styled.SelectedCardsHeader>Cards Traded</Styled.SelectedCardsHeader>
      <SelectedCards cardData={tradedCards} preventGradeChanges={true} />
      <Styled.SelectedCardsHeader>Cards Received</Styled.SelectedCardsHeader>
      <SelectedCards cardData={receivedCards} preventGradeChanges={true} />
    </Styled.ConfirmContainer>
  );
}
