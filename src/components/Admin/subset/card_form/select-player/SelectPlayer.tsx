import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Player } from "../../../../../store/library/players/types";
import DataTable from "react-data-table-component";
import * as Styled from "./styled";
import { columns, customStyles } from "./dataTable";

interface Props {
  addPlayer(player: Player): void;
}

export default function SelectPlayer(props: Props) {
  const players = useSelector((state: RootState) => state.library.players);

  const [playerSearch, setPlayerSearch] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerSearch(e.target.value);
  }

  return (
    <Styled.Container>
      <Styled.SearchInput
        type="text"
        placeholder="search players"
        value={playerSearch}
        onChange={handleSearchChange}
      />
      <DataTable
        data={players}
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
