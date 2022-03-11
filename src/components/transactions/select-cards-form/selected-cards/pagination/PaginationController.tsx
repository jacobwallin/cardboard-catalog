import React, { useState } from "react";
import { TotalCards } from "../../../../Collection/shared";
import * as Styled from "./styled";

interface Props {
  rowsPerPage: number;
  rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  setCurrentPage(pageNumber: number): void;
  currentPage: number;
  totalCards: number;
}

export default function PaginationController(props: Props) {
  const {
    rowsPerPage,
    rowsPerPageChange,
    setCurrentPage,
    currentPage,
    totalCards,
  } = props;

  function nextPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (currentPage * rowsPerPage < totalCards) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function lastPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setCurrentPage(Math.ceil(totalCards / rowsPerPage));
  }

  function firstPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setCurrentPage(1);
  }

  return (
    <Styled.MenuContainer>
      <Styled.RowsContainer>
        <div>{currentPage}</div>
        <Styled.RowsPerPageLabel>Rows: </Styled.RowsPerPageLabel>
        <Styled.RowsPerPage
          id="rows"
          value={rowsPerPage}
          onChange={rowsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </Styled.RowsPerPage>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </Styled.RowsContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        onClick={firstPage}
      >
        <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
        <path fill="none" d="M24 24H0V0h24v24z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        onClick={previousPage}
      >
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
      </svg>
      <Styled.PageStatus>
        {`${(currentPage - 1) * rowsPerPage + 1} - ${
          currentPage * rowsPerPage > totalCards
            ? totalCards
            : currentPage * rowsPerPage
        } of ${totalCards}`}
      </Styled.PageStatus>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        onClick={nextPage}
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        onClick={lastPage}
      >
        <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
        <path fill="none" d="M0 0h24v24H0V0z"></path>
      </svg>
    </Styled.MenuContainer>
  );
}
