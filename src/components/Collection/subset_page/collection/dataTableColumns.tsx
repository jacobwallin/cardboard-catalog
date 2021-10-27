import React from "react";
import tableStyles from "../../shared/dataTableStyles";
import { TableDataPoint } from "../createTableData";
import { DeleteTableDataPoint } from "../createTableData";
import CardNumber from "../CardNumber";

const customColumnSort = (rowA: TableDataPoint, rowB: TableDataPoint) => {
  let a: string | number = rowA.cardData.number;
  let b: string | number = rowB.cardData.number;

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
};

let modifiedStyles = { ...tableStyles, fontSize: "12px" };

export const columns = [
  {
    name: "#",
    selector: (row: TableDataPoint) => row.cardData.number,
    cell: (row: TableDataPoint) => (
      <CardNumber
        number={row.cardData.number}
        serialized={row.series.serialized}
        shortPrint={row.series.shortPrint}
        auto={row.series.auto}
        relic={row.series.relic}
        manufacturedRelic={row.series.manufacturedRelic}
      />
    ),
    sortable: true,
    style: modifiedStyles,
    grow: 1,
    sortFunction: customColumnSort,
    minWidth: "auto",
  },
  {
    name: "Qty",
    selector: (row: TableDataPoint) => row.quantity,
    sortable: true,
    style: modifiedStyles,
    grow: 1,
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
    style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Team",
    cell: (row: TableDataPoint) => (row.cardData.team ? row.cardData.team.name : "-"),
    sortable: false,
    style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Parallel Set",
    selector: (row: TableDataPoint) => row.series.name,
    sortable: true,
    style: modifiedStyles,
    grow: 2,
  },
];

const customDeleteColumnSort = (rowA: DeleteTableDataPoint, rowB: DeleteTableDataPoint) => {
  let a: string | number = rowA.card.cardData.number;
  let b: string | number = rowB.card.cardData.number;

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
};

export const deleteColumns = [
  {
    name: "#",
    selector: (row: DeleteTableDataPoint) => row.card.cardData.number,
    cell: (row: DeleteTableDataPoint) => (
      <CardNumber
        number={row.card.cardData.number}
        serialized={row.card.series.serialized}
        shortPrint={row.card.series.shortPrint}
        auto={row.card.series.auto}
        relic={row.card.series.relic}
        manufacturedRelic={row.card.series.manufacturedRelic}
      />
    ),
    sortable: true,
    style: modifiedStyles,
    grow: 1,
    sortFunction: customDeleteColumnSort,
    minWidth: "auto",
  },
  {
    name: "Qty",
    cell: (row: DeleteTableDataPoint) => 1,
    sortable: true,
    style: modifiedStyles,
    grow: 1,
  },
  {
    name: "Name",
    selector: (row: DeleteTableDataPoint) => row.card.cardData.name,
    cell: (row: DeleteTableDataPoint) => (
      <div>
        <div>{row.card.cardData.name}</div>
        <div style={{ color: "gray" }}>{row.card.cardData.note}</div>
      </div>
    ),
    sortable: true,
    style: modifiedStyles,
    grow: 2,
  },

  {
    name: "Team",
    cell: (row: DeleteTableDataPoint) =>
      row.card.cardData.team ? row.card.cardData.team.name : "-",
    sortable: false,
    style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Parallel Set",
    selector: (row: DeleteTableDataPoint) => row.card.series.name,
    sortable: true,
    style: modifiedStyles,
    grow: 2,
  },
];

export const rowDisabledCriteria = (row: TableDataPoint) => row.quantity === 0;
