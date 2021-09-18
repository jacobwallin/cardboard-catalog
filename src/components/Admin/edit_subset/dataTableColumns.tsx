import React from "react";
import EditLink from "../components/EditLink";
import { CardData, Series } from "../../../store/library/subsets/types";

export const seriesDataTableColumns = [
  {
    name: "Name",
    selector: (row: Series) => row.name,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Series) => <EditLink to={`/admin/edit/series/${row.id}`} />,
    grow: 0,
  },
];

export const cardsDataTableColumns = [
  {
    name: "Card Number",
    selector: (row: CardData) => row.number,
    sortFunction: (rowA: CardData, rowB: CardData) => {
      let a: string | number = rowA.number;
      let b: string | number = rowB.number;

      // convert to number if possible
      if (+a && +b) {
        a = +a;
        b = +b;
      }

      // compare
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    },
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: CardData) => row.name,
    sortable: true,
  },
  {
    name: "Team",
    selector: (row: CardData) => row.team.name,
    sortable: true,
  },
  {
    name: "Rookie",
    selector: (row: CardData) => row.rookie,
    sortable: true,
    cell: (row: CardData) => (row.rookie ? "RC" : ""),
  },
  {
    name: "",
    sortable: false,
    cell: (row: CardData) => <EditLink to={`/admin/edit/card/${row.id}`} />,
    grow: 0,
  },
];
