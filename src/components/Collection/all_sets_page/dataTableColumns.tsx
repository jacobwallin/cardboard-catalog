import { Link } from "react-router-dom";
import React from "react";

const columns = [
  {
    name: "Set Name",
    selector: "setName",
    sortable: true,
    cell: (row: any) => (
      <Link to={`/collection/set/${row.setId}`}>{row.setName}</Link>
    ),
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
