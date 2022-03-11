import React, { useState } from "react";
import AddCardsLine from "../add_cards_line/AddCardsLine";
import { CardFormData } from "../AddCardsForm";
import * as Styled from "./styled";
import PaginationController from "./pagination/PaginationController";

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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  function rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowsPerPage(+e.target.value);
    setCurrentPage(1);
  }

  function setPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <Styled.CardDataContainer>
      <PaginationController
        rowsPerPage={rowsPerPage}
        rowsPerPageChange={rowsPerPageChange}
        setCurrentPage={setPage}
        totalCards={cardData.length}
        currentPage={currentPage}
      />
      {cardData
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .map((card, index) => {
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
