import React from "react";
import { Team } from "../../../store/library/teams/types";
import { StyledLink } from "../components/EditLink";

const columns = (editToggle: (team: Team) => void) => [
  {
    name: "Name",
    selector: (row: Team) => row.name,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Team) => (
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
