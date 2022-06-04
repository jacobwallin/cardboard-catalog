import React from "react";
import SubtleLink from "../../shared/SubtleLink";
import { TableRow } from "./aggregateByYear";
import StyledLink from "../../Collection/shared/StyledLink";

const columns = [
  {
    name: "Year",
    selector: (row: TableRow) => row.year,
    sortable: true,
    cell: (row: TableRow) => (
      <SubtleLink to={`/browse/${row.year}`}>{row.year}</SubtleLink>
    ),
    minWidth: "50px",
    grow: 2,
  },

  {
    name: "",
    sortable: false,
    cell: (row: TableRow) => (
      <StyledLink to={`/browse/${row.year}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
