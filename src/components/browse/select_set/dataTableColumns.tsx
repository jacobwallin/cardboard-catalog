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
    minWidth: "50px",
    grow: 2,
  },

  {
    name: "Brand",
    selector: (row: SetSummary) => row.brand.name,
    sortable: true,
  },
  {
    name: "Release Date",
    selector: (row: SetSummary) => row.release_date,
    sortable: true,
  },

  {
    name: "",
    sortable: false,
    cell: (row: SetSummary) => (
      <StyledLink to={`/set/${row.id}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
