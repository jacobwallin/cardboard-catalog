import React, { useState } from "react";
import { Player } from "../../../store/library/players/types";
import PaginationController from "../../transactions/select-cards-form/selected-cards/pagination/PaginationController";

interface Props {
  players: Player[];
}

export default function PlayerTable(props: Props) {
  const { players } = props;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  function rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowsPerPage(+e.target.value);
  }
  function currentPageChange(newCurrentPage: number) {
    setCurrentPage(newCurrentPage);
  }

  return (
    <>
      <PaginationController
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalCards={players.length}
        setCurrentPage={currentPageChange}
        rowsPerPageChange={rowsPerPageChange}
        hideRowsPerPage
        hideTotal
      />
    </>
  );
}
