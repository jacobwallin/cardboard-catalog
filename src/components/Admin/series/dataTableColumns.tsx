import React from "react";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import CardNumber from "../../Collection/subset_page/CardNumber";
import { Card } from "../../../store/library/series/types";
import { StyledLink } from "../components/EditLink";

interface Row {
  card: Card;
  serialized: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  refractor: boolean;
  parallel: boolean;
  shortPrint: boolean;
}

const columns = (editToggle: (card: Card) => void) => [
  {
    name: "Card Number",
    selector: (row: Row) => row.card.card_datum.number,
    cell: (row: Row) => {
      return (
        <CardNumber
          number={row.card.card_datum.number}
          serialized={row.card.serializedTo || row.serialized}
          shortPrint={row.shortPrint}
          auto={row.auto}
          relic={row.relic}
          manufacturedRelic={row.manufacturedRelic}
          refractor={row.refractor}
        />
      );
    },
    sortFunction: (rowA: Row, rowB: Row) => {
      return sortCardNumbers(
        rowA.card.card_datum.number,
        rowB.card.card_datum.number
      );
    },
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: Row) => row.card.card_datum.name,
    sortable: true,
  },
  {
    name: "Note",
    selector: (row: Row) => row.card.card_datum.note,
    sortable: true,
  },
  {
    name: "Player(s)",
    sortable: false,
    cell: (row: Row) =>
      row.card.card_datum.players.length > 0
        ? row.card.card_datum.players.map((player) => player.name + " ")
        : "",
  },
  {
    name: "Team",
    sortable: true,
    selector: (row: Row) => row.card.card_datum.team?.name,
    sortFunction: (rowA: Row, rowB: Row) => {
      let a: string | null = rowA.card.card_datum.team
        ? rowA.card.card_datum.team.name
        : null;
      let b: string | null = rowB.card.card_datum.team
        ? rowB.card.card_datum.team.name
        : null;

      if (a === null) return -1;
      if (b === null) return 1;

      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    },
    cell: (row: Row) =>
      row.card.card_datum.team ? row.card.card_datum.team.name : "-",
  },
  {
    name: "Rookie",
    selector: (row: Row) => row.card.card_datum.rookie,
    sortable: true,
    cell: (row: Row) => (row.card.card_datum.rookie ? "RC" : ""),
  },
  {
    name: "",
    sortable: false,
    cell: (row: Row) => (
      <>
        <StyledLink as="div" onClick={() => editToggle(row.card)}>
          Edit
        </StyledLink>
      </>
    ),
    grow: 0,
  },
];

export default columns;
