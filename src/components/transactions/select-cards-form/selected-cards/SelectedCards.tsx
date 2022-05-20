import React, { useState } from "react";
import AddCardsLine from "../add_cards_line/AddCardsLine";
import { CardFormData } from "../AddCardsForm";
import * as Styled from "./styled";
import PaginationController from "./pagination/PaginationController";
import { getSetName } from "../../../Collection/filter/columns";

interface AcceptChanges {
  cardData: CardFormData[];
  handleDelete(cardIndex: number): any;
  handleSerializedChange(cardIndex: number, serialNumber: string): any;
  handleGradeChange(cardIndex: number, grade: string): any;
  handleGradingCompanyIdChange(
    cardIndex: number,
    gradingCompanyId: number
  ): any;
  clearGradeData(cardIndex: number): any;
  preventGradeChanges: false;
}

interface NoChanges {
  cardData: CardFormData[];
  preventGradeChanges: true;
  handleDelete?(cardIndex: number): any;
}

type Props = AcceptChanges | NoChanges;

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
          let setName = undefined;
          if (
            index === 0 ||
            cardData[(currentPage - 1) * rowsPerPage + (index - 1)].card.series
              .id !== card.card.series.id
          ) {
            setName = getSetName(
              card.card.series.subset.set.name,
              card.card.series.subset.name,
              card.card.series.name,
              card.card.series.id,
              card.card.series.subset.base,
              card.card.series.subset.baseSeriesId || 0
            );
          }
          if (props.preventGradeChanges) {
            return (
              <AddCardsLine
                key={String(card.id) + String(index)}
                index={index}
                card={card}
                preventGradeChanges={true}
                handleDelete={props.handleDelete}
                setName={setName}
              />
            );
          } else {
            return (
              <AddCardsLine
                key={String(card.id) + String(index)}
                index={index}
                card={card}
                clearGradeData={props.clearGradeData}
                handleDelete={props.handleDelete}
                handleSerializedChange={props.handleSerializedChange}
                handleGradeChange={props.handleGradeChange}
                handleGradingCompanyIdChange={
                  props.handleGradingCompanyIdChange
                }
                preventGradeChanges={false}
                setName={setName}
              />
            );
          }
        })}
    </Styled.CardDataContainer>
  );
}
