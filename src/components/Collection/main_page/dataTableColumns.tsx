import { Link } from "react-router-dom";
import React from "react";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";

const columns = [
  {
    name: "Year",
    selector: "year",
    sortable: true,
    cell: (row: any) => <Link to={`/collection/${row.year}`}>{row.year}</Link>,
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
    minWidth: "25px",
    style: tableStyles,
    grow: 1,
  },
  {
    name: "Distinct Cards",
    selector: "distinctCards",
    minWidth: "50px",
    style: tableStyles,
    grow: 1,
    hide: 350,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => (
      <StyledLink to={`/collection/${row.year}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
