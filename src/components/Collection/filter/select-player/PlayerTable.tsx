import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { clearPlayers } from "../../../../store/library/players/actions";
import PaginationController from "../../../transactions/select-cards-form/selected-cards/pagination/PaginationController";
import * as Styled from "./styled";
import { Player } from "../../../../store/library/players/types";

interface Props {
  selectPlayer: (playerIdName: string) => void;
}

export default function PlayerTable(props: Props) {
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [playerSearched, setPlayerSearched] = useState(false);

  const players = useSelector((state: RootState) => state.library.players);

  useEffect(() => {
    dispatch(clearPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (search !== "") {
      setSelectedPlayer(0);
      setPlayerSearched(true);
      dispatch(
        fetchAllPlayers(
          `?search=${search}&limit=${rowsPerPage}&offset=${
            (currentPage - 1) * rowsPerPage
          }`
        )
      );
    }
  }, [rowsPerPage, currentPage, search, dispatch]);

  // reset current page to 1 when new players are fetched
  useEffect(() => {
    setCurrentPage(1);
  }, [players]);

  function searchPlayers(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSearch(searchField);
  }

  function rowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowsPerPage(+e.target.value);
  }
  function currentPageChange(newCurrentPage: number) {
    setCurrentPage(newCurrentPage);
  }
  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(e.target.value);
  }

  function handlePlayerSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const playerId = +e.target.id.split("-")[0];
    if (playerId === selectedPlayer) {
      setSelectedPlayer(0);
      props.selectPlayer("");
    } else {
      setSelectedPlayer(playerId);
      props.selectPlayer(e.target.id);
    }
  }

  function handlePlayerRowClick(player: Player) {
    if (player.id === selectedPlayer) {
      setSelectedPlayer(0);
      props.selectPlayer("");
    } else {
      setSelectedPlayer(player.id);
      props.selectPlayer(`${player.id}-${player.name}`);
    }
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
      {playerSearched && (
        <Styled.Players>
          {players.rows.map((p) => {
            return (
              <Styled.PlayerRow
                key={p.id}
                onClick={() => handlePlayerRowClick(p)}
                selected={p.id === selectedPlayer}
              >
                <Styled.PlayerCheckbox
                  id={`${p.id}-${p.name}`}
                  onChange={handlePlayerSelect}
                  type="checkbox"
                  checked={selectedPlayer === p.id}
                />
                <div>{p.name}</div>
              </Styled.PlayerRow>
            );
          })}
        </Styled.Players>
      )}
    </>
  );
}
