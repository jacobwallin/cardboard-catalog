import React from "react";
import SubtleLink from "../../shared/SubtleLink";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";
import { TableData } from "./aggregateCards";
import { SetCards } from "../../../store/collection/browse/types";

export const allSetsColumns = [
  {
    name: "Year",
    selector: (row: TableData) => row.year,
    sortable: true,
    cell: (row: any) => (
      <SubtleLink to={`/collection/${row.year}`}>{row.year}</SubtleLink>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: TableData) => row.totalCards,
    sortable: true,
    minWidth: "80px",
    maxWidth: "80px",
    style: tableStyles,
    grow: 0,
  },

  {
    name: "",
    sortable: false,
    cell: (row: TableData) => (
      <StyledLink to={`/collection/${row.year}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
    grow: 0,
  },
];

export const yearColumns = [
  {
    name: "Set Name",
    selector: (row: SetCards) => row.setName,
    sortable: true,
    cell: (row: any) => (
      <SubtleLink to={`/set/${row.setId}?view=coll`}>{row.setName}</SubtleLink>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: SetCards) => row.totalCards,
    sortable: true,
    minWidth: "80px",
    maxWidth: "80px",
    style: tableStyles,
  },

  {
    name: "",
    sortable: false,
    cell: (row: any) => (
      <StyledLink to={`/set/${row.setId}?view=coll`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];
