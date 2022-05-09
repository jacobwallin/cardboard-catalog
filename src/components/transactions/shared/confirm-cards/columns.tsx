import React from "react";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import CardNumber from "../../../Collection/subset-page/CardNumber";
import sortCardNumbers from "../../../../utils/sortCardNumbers";
import { getSetName } from "../../../Collection/filter/columns";

const columns = [
  {
    name: "#",
    selector: (row: CardFormData) => row.card.card_datum.number,
    cell: (row: CardFormData) => (
      <CardNumber
        number={row.card.card_datum.number}
        serialized={row.card.series.serialized}
        shortPrint={row.card.series.subset.shortPrint}
        auto={row.card.series.subset.auto}
        relic={row.card.series.subset.relic}
        manufacturedRelic={row.card.series.subset.manufacturedRelic}
        refractor={row.card.series.refractor}
        rookie={row.card.card_datum.rookie}
      />
    ),
    sortable: true,
    sortFunction: (rowA: CardFormData, rowB: CardFormData) =>
      sortCardNumbers(rowA.card.card_datum.number, rowB.card.card_datum.number),
    grow: 1,
    minWidth: "auto",
  },
  {
    name: "Name",
    selector: (row: CardFormData) => row.card.card_datum.name,
    cell: (row: CardFormData) => (
      <div>
        <div>{row.card.card_datum.name}</div>
        <div style={{ color: "gray" }}>{row.card.card_datum.note}</div>
      </div>
    ),
    sortable: true,
    grow: 2,
  },
  {
    name: "Set",
    selector: (row: CardFormData) =>
      getSetName(
        row.card.series.subset.set.name,
        row.card.series.subset.name,
        row.card.series.name,
        row.card.series.subset.id,
        row.card.series.id,
        row.card.series.subset.set.baseSubsetId || 0,
        row.card.series.subset.baseSeriesId || 0
      ),
    sortable: true,
    grow: 4,
  },
  {
    name: "Team",
    cell: (row: CardFormData) =>
      row.card.card_datum.team ? row.card.card_datum.team.name : "-",
    sortable: false,
    grow: 4,
  },
];

export default columns;
