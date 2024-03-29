import React from "react";
import EditLink, { StyledLink } from "../components/EditLink";
import SubtleLink from "../../shared/SubtleLink";
import { CardData, SubsetSeries } from "../../../store/library/subsets/types";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import { ReactComponent as Checkmark } from "./checkmark.svg";
import * as Styled from "./styled";
import EditDeleteContainer from "../components/EditDeleteContainer";

export const seriesDataTableColumns = [
  {
    name: "Name",
    selector: (row: SubsetSeries) => row.name,
    cell: (row: SubsetSeries) => (
      <SubtleLink to={`/admin/series/${row.id}`}>{row.name}</SubtleLink>
    ),
    sortable: true,
  },
  {
    name: "Serialized To",
    selector: (row: SubsetSeries) => row.serialized || Infinity,
    cell: (row: SubsetSeries) => (row.serialized ? row.serialized : "-"),
    sortable: true,
  },
  {
    name: "Refractor",
    selector: (row: SubsetSeries) => row.refractor,
    cell: (row: SubsetSeries) =>
      row.refractor ? (
        <Styled.SvgWrapper>
          <Checkmark />
        </Styled.SvgWrapper>
      ) : (
        "-"
      ),
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: SubsetSeries) => (
      <EditLink to={`/admin/series/${row.id}`} view />
    ),
    grow: 0,
  },
];

export function cardsDataTableColumns(
  editToggle: (cardData: CardData) => void,
  disableEdit: boolean
) {
  return [
    {
      name: "#",
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
      cell: (row: CardData) => {
        if (!disableEdit) {
          return (
            <EditDeleteContainer>
              <StyledLink as="div" onClick={() => editToggle(row)}>
                Edit
              </StyledLink>
            </EditDeleteContainer>
          );
        }
      },
      grow: 0,
    },
  ];
}
