import React from "react";
import EditLink from "../components/EditLink";
import { SetSummary } from "../../../store/library/sets/types";

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
    name: "Date Created",
    selector: (row: SetSummary) => row.createdAt.slice(0, 10),
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: SetSummary) => <EditLink to={`/admin/edit/set/${row.id}`} />,
    grow: 0,
  },
];

export default dataTableColumns;
