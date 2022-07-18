import React from "react";
import SubtleLink from "../../shared/SubtleLink";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";
import { CollectionYears, CollectionSports } from "./aggregateSets";
import { SetCards } from "../../../store/collection/browse/types";

export const sportsColumns = [
  {
    name: "Sport",
    selector: (row: CollectionSports) => row.sport,
    sortable: true,
    cell: (row: any) => (
      <SubtleLink to={`/collection/${row.sport.toLowerCase()}`}>
        {row.sport}
      </SubtleLink>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: CollectionSports) => row.totalCards,
    sortable: true,
    minWidth: "80px",
    maxWidth: "80px",
    style: tableStyles,
    grow: 0,
  },

  {
    name: "",
    sortable: false,
    cell: (row: CollectionSports) => (
      <StyledLink to={`/collection/${row.sport.toLowerCase()}`}>
        View
      </StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
    grow: 0,
    hide: 600,
  },
];

export const yearsColumns = (sport: string) => [
  {
    name: "Year",
    selector: (row: CollectionYears) => row.year,
    sortable: true,
    cell: (row: any) => (
      <SubtleLink to={`/collection/${sport.toLowerCase()}/${row.year}`}>
        {row.year}
      </SubtleLink>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: CollectionYears) => row.totalCards,
    sortable: true,
    minWidth: "80px",
    maxWidth: "80px",
    style: tableStyles,
    grow: 0,
  },

  {
    name: "",
    sortable: false,
    cell: (row: CollectionYears) => (
      <StyledLink to={`/collection/${sport.toLowerCase()}/${row.year}`}>
        View
      </StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
    grow: 0,
    hide: 600,
  },
];

export const setsColumns = [
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
    hide: 600,
  },
];
