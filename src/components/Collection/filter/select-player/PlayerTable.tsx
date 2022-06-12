import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { Player } from "../../../../store/library/players/types";
import PaginationController from "../../../transactions/select-cards-form/selected-cards/pagination/PaginationController";
import * as Styled from "./styled";

interface Props {
  selectPlayer: (player: Player) => void;
}

export default function PlayerTable(props: Props) {
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const players = useSelector((state: RootState) => state.library.players);

  useEffect(() => {
    dispatch(
      fetchAllPlayers(
        `?search=${search}&limit=${rowsPerPage}&offset=${
          (currentPage - 1) * rowsPerPage
        }`
      )
    );
  }, [rowsPerPage, currentPage]);

  function searchPlayers() {
    dispatch(
      fetchAllPlayers(
        `?search=${search}&limit=${rowsPerPage}&offset=${
          (currentPage - 1) * rowsPerPage
        }`
      )
    );
  }

  function rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowsPerPage(+e.target.value);
  }
  function currentPageChange(newCurrentPage: number) {
    console.log("!!!");
    setCurrentPage(newCurrentPage);
  }
  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      <Styled.Search>
        <Styled.PlayerSearch
          id="playerSearch"
          type="text"
          value={search}
          placeholder="player name"
          onChange={searchChange}
          autoComplete="off"
        />
        <button onClick={searchPlayers}>Search</button>
      </Styled.Search>
      <PaginationController
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalCards={players.count}
        setCurrentPage={currentPageChange}
        rowsPerPageChange={rowsPerPageChange}
        hideRowsPerPage
        hideTotal
      />
      <Styled.Players>
        {players.rows.map((p) => {
          return (
            <Styled.PlayerRow>
              <Styled.PlayerCheckbox type="checkbox" />
              <div>{p.name}</div>
            </Styled.PlayerRow>
          );
        })}
      </Styled.Players>
    </>
  );
}
