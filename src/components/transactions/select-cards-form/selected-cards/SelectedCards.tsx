import React from "react";
import AddCardsLine from "../add_cards_line/AddCardsLine";
import { CardFormData } from "../AddCardsForm";
import * as Styled from "./styled";

interface Props {
  cardData: CardFormData[];
  handleDelete(cardIndex: number): any;
  handleSerializedChange(cardIndex: number, serialNumber: string): any;
  handleGradeChange(cardIndex: number, grade: string): any;
  handleGradingCompanyIdChange(
    cardIndex: number,
    gradingCompanyId: number
  ): any;
  clearGradeData(cardIndex: number): any;
  preventGradeChanges: boolean;
}

export default function SelectedCards(props: Props) {
  const { cardData } = props;
  return (
    <Styled.CardDataContainer>
      {cardData.map((card, index) => {
        return (
          <AddCardsLine
            key={String(card.cardId) + String(index)}
            serialized={card.serialized}
            index={index}
            card={card}
            clearGradeData={props.clearGradeData}
            handleDelete={props.handleDelete}
            handleSerializedChange={props.handleSerializedChange}
            handleGradeChange={props.handleGradeChange}
            handleGradingCompanyIdChange={props.handleGradingCompanyIdChange}
            preventGradeChanges={props.preventGradeChanges}
          />
        );
      })}
    </Styled.CardDataContainer>
  );
}
