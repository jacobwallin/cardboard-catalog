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
  const [searchField, setSearchField] = useState("");

  const players = useSelector((state: RootState) => state.library.players);

  useEffect(() => {
    if (search !== "") {
      dispatch(
        fetchAllPlayers(
          `?search=${search}&limit=${rowsPerPage}&offset=${
            (currentPage - 1) * rowsPerPage
          }`
        )
      );
    }
  }, [rowsPerPage, currentPage, search]);

  function searchPlayers(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSearch(searchField);
  }

  function rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowsPerPage(+e.target.value);
  }
  function currentPageChange(newCurrentPage: number) {
    console.log("!!!");
    setCurrentPage(newCurrentPage);
  }
  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(e.target.value);
  }

  return (
    <>
      <Styled.Search>
        <Styled.PlayerSearch
          id="playerSearch"
          type="text"
          value={searchField}
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
            <Styled.PlayerRow key={p.id}>
              <Styled.PlayerCheckbox type="checkbox" />
              <div>{p.name}</div>
            </Styled.PlayerRow>
          );
        })}
      </Styled.Players>
    </>
  );
}
