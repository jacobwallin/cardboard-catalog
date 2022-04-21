import React from "react";
import StyledButton from "../../../components/StyledButton";
import { Player } from "../../../../../store/library/players/types";
import LinkIconWrapper from "../shared/Link";
import { ReactComponent as LinkIcon } from "../shared/link.svg";

export const columns = (addPlayer: (player: Player) => void) => [
  { name: "Name", selector: (row: Player) => row.name, sortable: true },
  { name: "DOB", selector: (row: Player) => row.birthday, sortable: true },
  {
    name: "Page",
    cell: (row: Player) => (
      <LinkIconWrapper href={row.url} target="_blank" rel="noopener noreferrer">
        <LinkIcon />
      </LinkIconWrapper>
    ),
    sortable: false,
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

export const customStyles = {
  rows: {
    denseStyle: {
      minHeight: "28px",
    },
  },
};
