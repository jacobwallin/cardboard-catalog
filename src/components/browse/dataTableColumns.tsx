import React from "react";
import SubtleLink from "../shared/SubtleLink";
import { TableRow } from "./aggregateByYear";
import { League } from "../../store/library/leagues/types";
import { SetSummary } from "../../store/library/sets/types";
import StyledLink from "../Collection/shared/StyledLink";

export const sportColumns = [
  {
    name: "Sport",
    selector: (row: League) => row.name,
    cell: (row: League) => (
      <SubtleLink to={`${row.name.toLowerCase()}`}>{row.name}</SubtleLink>
    ),
    sortable: true,
    grow: 1,
  },
  {
    name: "",
    sortable: false,
    cell: (row: League) => (
      <StyledLink to={`${row.name.toLowerCase()}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export const yearColumns = [
  {
    name: "Year",
    selector: (row: TableRow) => row.year,
    sortable: true,
    cell: (row: TableRow) => (
      <SubtleLink to={`${row.year}`}>{row.year}</SubtleLink>
    ),
    minWidth: "50px",
    grow: 2,
  },

  {
    name: "",
    sortable: false,
    cell: (row: TableRow) => <StyledLink to={`${row.year}`}>View</StyledLink>,
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export const setColumns = [
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
