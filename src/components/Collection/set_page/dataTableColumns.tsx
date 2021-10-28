import React from "react";
import StyledLink from "../shared/StyledLink";
import SubtleLink from "../../shared/SubtleLink";

const columns = (haveCards: boolean) => {
  return [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row: any) => <SubtleLink to={`/subset/${row.id}`}>{row.name}</SubtleLink>,
      minWidth: "50px",
      grow: 2,
      compact: true,
    },
    {
      name: "Cards",
      selector: (row: any) => (row.totalCards > 0 ? row.totalCards : ""),
      sortable: true,
      minWidth: "75px",
      maxWidth: "75px",
      compact: true,
      omit: haveCards,
    },

    {
      name: "",
      sortable: false,
      cell: (row: any) => <StyledLink to={`/subset/${row.id}`}>View</StyledLink>,
      maxWidth: "80px",
      minWidth: "80px",
      compact: true,
      hide: 600,
    },
  ];
};

export default columns;
