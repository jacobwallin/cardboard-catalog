import { Link } from "react-router-dom";
import React from "react";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";

const columns = [
  {
    name: "Set Name",
    selector: "setName",
    sortable: true,
    cell: (row: any) => (
      <Link to={`/collection/set/${row.setId}`}>{row.setName}</Link>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
    minWidth: "50px",
    style: tableStyles,
    grow: 1,
  },
  {
    name: "Unique Cards",
    selector: "distinctCards",
    sortable: true,
    minWidth: "50px",
    style: tableStyles,
    grow: 1,
    hide: 350,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => (
      <StyledLink to={`/collection/set/${row.setId}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
