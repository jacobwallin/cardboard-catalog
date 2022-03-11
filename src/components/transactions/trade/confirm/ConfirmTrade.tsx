import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import * as Styled from "./styled";
import SelectedCards from "../../select-cards-form/selected-cards/SelectedCards";

interface Props {
  tradedCards: CardFormData[];
  receivedCards: CardFormData[];
}

export default function ConfirmTrade(props: Props) {
  const { tradedCards, receivedCards } = props;
  return (
    <>
      <div>enter trade details and confirm cards traded and received.</div>
      <Styled.ConfirmContainer>
        <Styled.SelectedCardsHeader>Cards Traded</Styled.SelectedCardsHeader>
        <SelectedCards cardData={tradedCards} preventGradeChanges={true} />
        <Styled.SelectedCardsHeader>Cards Received</Styled.SelectedCardsHeader>
        <SelectedCards cardData={receivedCards} preventGradeChanges={true} />
      </Styled.ConfirmContainer>
    </>
  );
}
