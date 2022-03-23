import React from "react";
import StyledLink from "../shared/StyledLink";
import SubtleLink from "../../shared/SubtleLink";

const columns = (haveCards: boolean, viewingCollection: boolean) => {
  return [
    {
      name: "Name",
      selector: (row: any) => row.totalCards > 0 && row.totalCards,
      sortable: true,
      cell: (row: any) => {
        let slug = `/subset/${row.id}`;
        if (viewingCollection) slug += "?view=coll";
        return <SubtleLink to={slug}>{row.name}</SubtleLink>;
      },
      minWidth: "50px",
      grow: 2,
      compact: true,
    },
    {
      name: "Cards",
      selector: (row: any) => row.totalCards > 0 && row.totalCards,
      sortable: true,
      minWidth: "75px",
      maxWidth: "75px",
      compact: true,
      omit: haveCards,
    },

    {
      name: "",
      sortable: false,
      cell: (row: any) => {
        let slug = `/subset/${row.id}`;
        if (viewingCollection) slug += "?view=coll";
        return <StyledLink to={slug}>View</StyledLink>;
      },
      maxWidth: "80px",
      minWidth: "80px",
      compact: true,
      hide: 600,
    },
  ];
};

export default columns;
