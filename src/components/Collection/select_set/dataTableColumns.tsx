import React from "react";
import SubtleLink from "../../shared/SubtleLink";
import tableStyles from "../shared/dataTableStyles";
import StyledLink from "../shared/StyledLink";
import { SetCards } from "../../../store/collection/browse/types";

const columns = [
  {
    name: "Set Name",
    selector: (row: SetCards) => row.setName,
    sortable: true,
    cell: (row: any) => (
      <SubtleLink to={`/set/${row.setId}?view=coll`}>{row.setName}</SubtleLink>
    ),
    minWidth: "50px",
    style: tableStyles,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: SetCards) => row.totalCards,
    sortable: true,
    minWidth: "75px",
    maxWidth: "75px",
    style: tableStyles,
  },

  {
    name: "",
    sortable: false,
    cell: (row: any) => (
      <StyledLink to={`/set/${row.setId}?view=coll`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];

export default columns;
