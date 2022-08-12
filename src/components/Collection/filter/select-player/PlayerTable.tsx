import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { clearPlayers } from "../../../../store/library/players/actions";
import PaginationController from "../../../transactions/select-cards-form/selected-cards/pagination/PaginationController";
import * as Styled from "./styled";
import { Player } from "../../../../store/library/players/types";
import { LoadingDots } from "../../../shared/Loading";
import { createLoadingSelector } from "../../../../store/loading/reducer";
const playerSearchLoadingSelector = createLoadingSelector(["GET_ALL_PLAYERS"]);

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
  const loadingPlayers = useSelector((state: RootState) =>
    playerSearchLoadingSelector(state)
  );

  useEffect(() => {
    dispatch(clearPlayers());
  }, [dispatch]);

  useEffect(() => {
    setSelectedPlayer(0);
    setPlayerSearched(true);
    dispatch(clearPlayers());
    dispatch(
      fetchAllPlayers(
        `?search=${search}&limit=${rowsPerPage}&offset=${
          (currentPage - 1) * rowsPerPage
        }`
      )
    );
  }, [rowsPerPage, currentPage, search, dispatch]);

  function searchPlayers(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSearch(searchField);
    setCurrentPage(1);
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
          {loadingPlayers && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingDots />
            </div>
          )}
          {players.rows.length > 0 &&
            players.rows.map((p) => {
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
          {!loadingPlayers && players.rows.length === 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                color: "#777",
                fontSize: "0.9rem",
              }}
            >
              no results found
            </div>
          )}
        </Styled.Players>
      )}
    </>
  );
}
