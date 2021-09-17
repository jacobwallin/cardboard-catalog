import React from "react";
import StyledLink from "../../Collection/shared/StyledLink";

const dataTableColumns = [
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
    name: "Name",
    selector: "name",
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
    cell: (row: any) => (
      <StyledLink to={`/admin/edit/set/${row.id}`}>Edit</StyledLink>
    ),
    grow: 0,
  },
];

export default dataTableColumns;
