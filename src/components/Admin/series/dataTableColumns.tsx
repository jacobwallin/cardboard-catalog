import React from "react";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import CardNumber from "../../Collection/subset-page/CardNumber";
import {
  Card,
  Series,
  SeriesCardData,
} from "../../../store/library/series/types";
import { StyledLink } from "../components/EditLink";
import StyledButton from "../components/StyledButton";
import EditDeleteContainer from "../components/EditDeleteContainer";

export interface Row {
  card: Card;
  serialized: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  refractor: boolean;
  parallel: boolean;
  shortPrint: boolean;
}

export function createTableData(series: Series): Row[] {
  return series.cards
    .sort((cardA, cardB) => {
      return sortCardNumbers(cardA.card_datum.number, cardB.card_datum.number);
    })
    .map((card) => {
      return {
        card,
        serialized: series.serialized,
        auto: series.subset.auto,
        relic: series.subset.relic,
        manufacturedRelic: series.subset.manufacturedRelic,
        refractor: series.refractor,
        parallel: series.parallel,
        shortPrint: series.subset.shortPrint,
      };
    });
}

export const cardColumns = (
  editToggle: (card: Card) => void,
  disabledEdit: boolean
) => [
  {
    name: "#",
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
          rookie={row.card.card_datum.rookie}
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
    cell: (row: Row) => {
      if (!disabledEdit) {
        return (
          <EditDeleteContainer>
            <StyledLink as="div" onClick={() => editToggle(row.card)}>
              Edit
            </StyledLink>
          </EditDeleteContainer>
        );
      }
    },
    grow: 0,
  },
];

export function createCardDataTableData(
  series: Series,
  cardData: SeriesCardData[]
): SeriesCardData[] {
  // only show the card data instances that are not part of the series' set of cards
  return cardData
    .filter((c) => {
      return series.cards.findIndex((card) => card.cardDataId === c.id) === -1;
    })
    .sort((cardA, cardB) => {
      return sortCardNumbers(cardA.number, cardB.number);
    });
}

export const cardDataColumns = [
  {
    name: "#",
    selector: (row: SeriesCardData) => row.number,
    sortFunction: (rowA: SeriesCardData, rowB: SeriesCardData) => {
      return sortCardNumbers(rowA.number, rowB.number);
    },
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: SeriesCardData) => row.name,
    sortable: true,
  },
  {
    name: "Note",
    selector: (row: SeriesCardData) => row.note,
    sortable: true,
  },
  {
    name: "Player(s)",
    sortable: false,
    cell: (row: SeriesCardData) =>
      row.players.length > 0
        ? row.players.map((player) => player.name + " ")
        : "",
  },
  {
    name: "Team",
    sortable: true,
    sortFunction: (rowA: SeriesCardData, rowB: SeriesCardData) => {
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
    cell: (row: SeriesCardData) => (row.team ? row.team.name : "-"),
  },
  {
    name: "Rookie",
    selector: (row: SeriesCardData) => row.rookie,
    sortable: true,
    cell: (row: SeriesCardData) => (row.rookie ? "RC" : ""),
  },
];
