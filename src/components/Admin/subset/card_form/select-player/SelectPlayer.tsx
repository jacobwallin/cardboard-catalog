import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Player } from "../../../../../store/library/players/types";
import DataTable from "react-data-table-component";
import LinkIconWrapper from "../shared/Link";
import { ReactComponent as LinkIcon } from "../shared/link.svg";
import * as Styled from "./styled";
import StyledButton from "../../../components/StyledButton";

const columns = (addPlayer: (player: Player) => void) => [
  { name: "Name", selector: (row: Player) => row.name, sortable: true },
  { name: "DOB", selector: (row: Player) => row.birthday, sortable: true },
  {
    name: "Page",
    cell: (row: Player) => (
      <LinkIconWrapper href={row.url} target="_blank" rel="noopener noreferrer">
        <LinkIcon />
      </LinkIconWrapper>
    ),
    sortable: true,
    grow: 0,
  },
  {
    name: "",
    selector: (row: Player) => row.url,
    cell: (row: Player) => (
      <StyledButton
        color="BLUE"
        fontSize=".8rem"
        width="50px"
        height="20px"
        onClick={() => addPlayer(row)}
      >
        Add
      </StyledButton>
    ),
    sortable: true,
    grow: 0,
  },
];

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
        paginationRowsPerPageOptions={[10]}
      />
    </Styled.Container>
  );
}
