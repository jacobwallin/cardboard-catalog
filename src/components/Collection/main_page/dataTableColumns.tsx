import { Link } from "react-router-dom";
import React from "react";

const columns = [
  {
    name: "Year",
    selector: "year",
    sortable: true,
    cell: (row: any) => <Link to={`/collection/${row.year}`}>{row.year}</Link>,
    style: {
      fontSize: "14px",
    },
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
    style: {
      fontSize: "14px",
    },
  },
  {
    name: "Distinct Cards",
    selector: "distinctCards",
    sortable: true,
    style: {
      fontSize: "14px",
    },
  },
];

export default columns;
