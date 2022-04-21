import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Player } from "../../../../../store/library/players/types";
import DataTable from "react-data-table-component";
import * as Styled from "./styled";
import { columns, customStyles } from "./dataTable";
import StyledButton from "../../../components/StyledButton";

interface Props {
  addPlayer(player: Player): void;
}

export default function SelectPlayer(props: Props) {
  const players = useSelector((state: RootState) => state.library.players);
  const [playerSearch, setPlayerSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setFilteredPlayers(
      players.filter(
        (p) => p.name.toLowerCase().indexOf(playerSearch.toLowerCase()) !== -1
      )
    );
  }, [players, playerSearch]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(e.target.value);
    if (e.target.value === "") setPlayerSearch("");
  }

  function search(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (searchField !== "") {
      setPlayerSearch(searchField);
    }
  }

  return (
    <Styled.Container>
      <Styled.SearchContainer>
        <Styled.SearchInput
          type="text"
          placeholder="search players"
          value={searchField}
          onChange={handleSearchChange}
        />
        <StyledButton
          width="75px"
          height="23px"
          fontSize=".9rem"
          color="BLUE"
          onClick={search}
        >
          Search
        </StyledButton>
      </Styled.SearchContainer>
      <DataTable
        data={filteredPlayers}
        columns={columns(props.addPlayer)}
        pagination
        dense
        noHeader
        paginationRowsPerPageOptions={[10, 15]}
        customStyles={customStyles}
        highlightOnHover
      />
    </Styled.Container>
  );
}
