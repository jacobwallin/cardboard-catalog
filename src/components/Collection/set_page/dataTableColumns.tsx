import React from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "Subset",
    selector: "name",
    sortable: true,
    cell: (row: any) => (
      <Link to={`/collection/subset/${row.id}`}>{row.name}</Link>
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
