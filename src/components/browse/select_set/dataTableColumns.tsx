import React from "react";
import { SetSummary } from "../../../store/library/sets/types";
import StyledLink from "../../Collection/shared/StyledLink";
import SubtleLink from "../../shared/SubtleLink";

const columns = [
  {
    name: "Set",
    selector: (row: SetSummary) => row.name,
    sortable: true,
    cell: (row: SetSummary) => (
      <SubtleLink to={`/set/${row.id}`}>{row.name}</SubtleLink>
    ),
    minWidth: "150px",
    grow: 2,
  },

  {
    name: "Brand",
    selector: (row: SetSummary) => row.brand.name,
    sortable: true,
    grow: 1,
  },
  {
    name: "Release Date",
    selector: (row: SetSummary) => row.release_date,
    sortable: true,
    grow: 1,
  },

  {
    name: "",
    sortable: false,
    cell: (row: SetSummary) => (
      <StyledLink to={`/set/${row.id}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
    grow: 1,
  },
];

export default columns;
