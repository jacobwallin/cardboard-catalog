import React from "react";
import SubtleLink from "../../shared/SubtleLink";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";

const columns = [
  {
    name: "Year",
    selector: "year",
    sortable: true,
    cell: (row: any) => <SubtleLink to={`/collection/${row.year}`}>{row.year}</SubtleLink>,
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: "totalCards",
    sortable: true,
    minWidth: "75px",
    maxWidth: "75px",
    style: tableStyles,
    grow: 0,
  },

  {
    name: "",
    sortable: false,
    cell: (row: any) => <StyledLink to={`/collection/${row.year}`}>View</StyledLink>,
    maxWidth: "80px",
    minWidth: "80px",
    grow: 0,
  },
];

export default columns;
