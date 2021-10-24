import React from "react";
import EditLink, { StyledLink } from "../components/EditLink";
import StyledButton from "../components/StyledButton";
import { CardData, Series } from "../../../store/library/subsets/types";
import sortCardNumbers from "../../../utils/sortCardNumbers";

export const seriesDataTableColumns = [
  {
    name: "Name",
    selector: (row: Series) => row.name,
    sortable: true,
  },
  {
    name: "Serialized To",
    selector: (row: Series) => row.serialized,
    cell: (row: Series) => (row.serialized ? row.serialized : "-"),
    sortable: true,
  },
  {
    name: "Auto",
    selector: (row: Series) => row.auto,
    cell: (row: Series) => (row.auto ? "yes" : "-"),
    sortable: true,
  },
  {
    name: "Relic",
    selector: (row: Series) => row.relic,
    cell: (row: Series) => (row.relic ? "yes" : "-"),
    sortable: true,
  },
  {
    name: "Short Print",
    selector: (row: Series) => row.shortPrint,
    cell: (row: Series) => (row.shortPrint ? "yes" : "-"),
    sortable: true,
  },
  {
    name: "Refractor",
    selector: (row: Series) => row.refractor,
    cell: (row: Series) => (row.refractor ? "yes" : "-"),
    sortable: true,
  },
  {
    name: "Man. Relic",
    selector: (row: Series) => row.manufacturedRelic,
    cell: (row: Series) => (row.manufacturedRelic ? "yes" : "-"),
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Series) => <EditLink to={`/admin/edit/series/${row.id}`} />,
    grow: 0,
  },
];

export function cardsDataTableColumns(
  editToggle: (cardData: CardData) => void,
  deleteCard: (cardData: CardData) => void
) {
  return [
    {
      name: "Card Number",
      selector: (row: CardData) => row.number,
      sortFunction: (rowA: CardData, rowB: CardData) => {
        return sortCardNumbers(rowA.number, rowB.number);
      },
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: CardData) => row.name,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row: CardData) => row.note,
      sortable: true,
    },
    {
      name: "Player(s)",
      sortable: false,
      cell: (row: CardData) =>
        row.players.length > 0
          ? row.players.map((player) => player.name + " ")
          : "",
    },
    {
      name: "Team",
      sortable: true,
      selector: (row: CardData) => row.team,
      sortFunction: (rowA: CardData, rowB: CardData) => {
        let a: string | null = rowA.team ? rowA.team.name : null;
        let b: string | null = rowB.team ? rowB.team.name : null;

        if (a === null) return -1;
        if (b === null) return 1;

        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        }
        return 0;
      },
      cell: (row: CardData) => (row.team ? row.team.name : "-"),
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
      cell: (row: CardData) => (
        <>
          <StyledLink as="div" onClick={() => editToggle(row)}>
            Edit
          </StyledLink>
          <StyledButton
            color="RED"
            width="25px"
            height="25px"
            onClick={() => deleteCard(row)}
          >
            X
          </StyledButton>
        </>
      ),
      grow: 0,
    },
  ];
}
