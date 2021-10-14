import { Link } from "react-router-dom";
import React from "react";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";

const columns = [
  {
    name: "Subset",
    selector: "name",
    sortable: true,
    cell: (row: any) => <Link to={`/subset/${row.id}`}>{row.name}</Link>,
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
    name: "Distinct Cards",
    selector: "distinctCards",
    sortable: true,
    minWidth: "50px",
    style: tableStyles,
    grow: 1,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <StyledLink to={`/subset/${row.id}`}>View</StyledLink>,
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
