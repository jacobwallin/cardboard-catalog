import React from "react";
import EditLink from "../components/EditLink";

const dataTableColumns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
  {
    name: "Brand",
    selector: "brand.name",
    sortable: true,
  },
  {
    name: "League",
    selector: "league.name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit/set/${row.id}`} />,
    grow: 0,
  },
];

export default dataTableColumns;
