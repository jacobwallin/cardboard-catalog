import React from "react";
import { Player } from "../../../store/library/players/types";
import SubtleLink from "../../shared/SubtleLink";
import { StyledLink } from "../components/EditLink";

const columns = (editToggle: (player: Player) => void) => [
  {
    name: "Name",
    selector: "name",
    cell: (row: Player) => (
      <SubtleLink as="a" href={`${row.url}`} target="_blank" rel="noopener">
        {row.name}
      </SubtleLink>
    ),
    sortable: true,
  },
  {
    name: "DOB",
    selector: "birthday",
    sortable: true,
  },
  {
    name: "Date Added",
    selector: (row: Player) => row.createdAt.slice(0, 10),
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Player) => (
      <>
        <StyledLink as="div" onClick={() => editToggle(row)}>
          Edit
        </StyledLink>
      </>
    ),
    grow: 0,
  },
];

export default columns;
