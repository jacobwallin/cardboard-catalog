import React from "react";
import { Player } from "../../../store/library/players/types";
import SubtleLink from "../../shared/SubtleLink";

const dataTableColumns = [
  {
    name: "Name",
    selector: "name",
    cell: (row: Player) => (
      <SubtleLink as="a" href={row.url} target="_blank" rel="noopener">
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
    name: "Date Created",
    selector: (row: Player) => row.createdAt.slice(0, 10),
    sortable: true,
  },
];

export default dataTableColumns;
