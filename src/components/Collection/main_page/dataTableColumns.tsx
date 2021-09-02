import { Link } from "react-router-dom";
import React from "react";

const columns = [
  {
    name: "Year",
    selector: "year",
    sortable: true,
    cell: (row: any) => <Link to={`/collection/${row.year}`}>{row.year}</Link>,
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
  },
  {
    name: "Distinct Cards",
    selector: "distinctCards",
    sortable: true,
  },
];

export default columns;
