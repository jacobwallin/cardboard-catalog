import React from "react";
import { TableDataPoint } from "../createTableData";
import CardNumber from "../CardNumber";
import sortCardNumbers from "../../../../utils/sortCardNumbers";

const columns = [
  {
    name: "#",
    selector: (row: TableDataPoint) => row.cardData.number,
    sortable: true,
    cell: (row: TableDataPoint) => (
      <CardNumber
        number={row.cardData.number}
        serialized={row.series.serialized}
        shortPrint={row.series.shortPrint}
        auto={row.series.auto}
        relic={row.series.relic}
        manufacturedRelic={row.series.manufacturedRelic}
        refractor={row.series.refractor}
      />
    ),
    grow: 1,
    sortFunction: (rowA: TableDataPoint, rowB: TableDataPoint) => {
      return sortCardNumbers(rowA.cardData.number, rowB.cardData.number);
    },
    minWidth: "auto",
  },
  {
    name: "Name",
    selector: (row: TableDataPoint) => row.cardData.name,
    cell: (row: TableDataPoint) => (
      <div>
        <div>{row.cardData.name}</div>
        <div style={{ color: "gray" }}>{row.cardData.note}</div>
      </div>
    ),
    sortable: true,
    // style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Team",
    cell: (row: TableDataPoint) => (row.cardData.team ? row.cardData.team.name : "-"),
    sortable: true,
    // style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Parallel Set",
    selector: (row: TableDataPoint) => row.series.name,
    sortable: true,
    // style: modifiedStyles,
    grow: 2,
  },
];

export default columns;
