import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import * as Styled from "./styled";
import SelectedCards from "../../select-cards-form/selected-cards/SelectedCards";
import TradeForm from "./trade-form/TradeForm";

interface Props {
  tradedCards: CardFormData[];
  receivedCards: CardFormData[];
}

export default function ConfirmTrade(props: Props) {
  const { tradedCards, receivedCards } = props;
  return (
    <Styled.ConfirmContainer>
      <Styled.PageTitle>Enter Trade Details</Styled.PageTitle>
      <TradeForm />
      <Styled.CardsInTrade>Cards In Trade</Styled.CardsInTrade>
      <Styled.SelectedCardsHeader>Cards Traded</Styled.SelectedCardsHeader>
      <SelectedCards cardData={tradedCards} preventGradeChanges={true} />
      <Styled.SelectedCardsHeader>Cards Received</Styled.SelectedCardsHeader>
      <SelectedCards cardData={receivedCards} preventGradeChanges={true} />
    </Styled.ConfirmContainer>
  );
}
