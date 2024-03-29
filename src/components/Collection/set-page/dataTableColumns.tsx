import React from "react";
import StyledLink from "../shared/StyledLink";
import SubtleLink from "../../shared/SubtleLink";
import { SubsetInstanceUserCard } from "./aggregateSubsetData";

const columns = (showQty: boolean, viewingCollection: boolean) => {
  return [
    {
      name: "Name",
      selector: (row: SubsetInstanceUserCard) =>
        row.totalCards > 0 && row.totalCards,
      sortable: true,
      cell: (row: SubsetInstanceUserCard) => {
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
      selector: (row: SubsetInstanceUserCard) => row.totalCards,
      sortable: true,
      minWidth: "75px",
      maxWidth: "75px",
      compact: true,
      omit: !showQty,
    },

    {
      name: "",
      sortable: false,
      cell: (row: SubsetInstanceUserCard) => {
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
