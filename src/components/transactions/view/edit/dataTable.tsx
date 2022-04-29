import React from "react";
import { UserCardWithTransaction } from "../../../../store/collection/transactions/types";
import CardNumber from "../../../Collection/subset-page/CardNumber";
import sortCardNumbers from "../../../../utils/sortCardNumbers";
import { getFullSetName } from "../../../Collection/filter/columns";

export const columns = () => [
  {
    name: "#",
    selector: (row: UserCardWithTransaction) => row.card.card_datum.number,
    cell: (row: UserCardWithTransaction) => (
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
    sortFunction: (
      rowA: UserCardWithTransaction,
      rowB: UserCardWithTransaction
    ) =>
      sortCardNumbers(rowA.card.card_datum.number, rowB.card.card_datum.number),
    grow: 1,
    minWidth: "auto",
  },
  {
    name: "Name",
    selector: (row: UserCardWithTransaction) => row.card.card_datum.name,
    cell: (row: UserCardWithTransaction) => (
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
    selector: (row: UserCardWithTransaction) => getFullSetName(row),
    sortable: true,
    grow: 4,
  },
  {
    name: "Team",
    cell: (row: UserCardWithTransaction) =>
      row.card.card_datum.team ? row.card.card_datum.team.name : "-",
    sortable: false,
    grow: 4,
  },
];
