import React from "react";
import tableStyles from "../../shared/dataTableStyles";
import { TableDataPoint } from "../createTableData";
import { DeleteTableDataPoint } from "../createTableData";
import CardNumber from "../CardNumber";
import sortCardNumbers from "../../../../utils/sortCardNumbers";

let modifiedStyles = { ...tableStyles, fontSize: "12px" };

export const columns = () => {
  return [
    {
      name: "#",
      selector: (row: TableDataPoint) => row.cardData.number,
      cell: (row: TableDataPoint) => (
        <CardNumber
          number={row.cardData.number}
          serialized={row.series.serialized}
          shortPrint={row.shortPrint}
          auto={row.auto}
          relic={row.relic}
          manufacturedRelic={row.manufacturedRelic}
          refractor={row.series.refractor}
          rookie={row.cardData.rookie}
        />
      ),
      sortable: true,
      sortFunction: (rowA: TableDataPoint, rowB: TableDataPoint) =>
        sortCardNumbers(rowA.cardData.number, rowB.cardData.number),
      style: modifiedStyles,
      grow: 1,
      minWidth: "auto",
    },
    {
      name: "Qty",
      selector: (row: TableDataPoint) => row.quantity,
      sortable: true,
      style: modifiedStyles,
      grow: 1,
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
      style: modifiedStyles,
      grow: 4,
    },
    {
      name: "Team",
      cell: (row: TableDataPoint) =>
        row.cardData.team ? row.cardData.team.name : "-",
      sortable: false,
      style: modifiedStyles,
      grow: 4,
    },
  ];
};

export const deleteColumns = (hideParallel: boolean) => {
  return [
    {
      name: "#",
      selector: (row: DeleteTableDataPoint) => row.card.cardData.number,
      cell: (row: DeleteTableDataPoint) => (
        <CardNumber
          number={row.card.cardData.number}
          serialized={row.card.series.serialized}
          shortPrint={row.shortPrint}
          auto={row.auto}
          relic={row.relic}
          manufacturedRelic={row.manufacturedRelic}
          refractor={row.card.series.refractor}
          rookie={row.card.cardData.rookie}
        />
      ),
      sortable: true,
      style: modifiedStyles,
      sortFunction: (
        rowA: DeleteTableDataPoint,
        rowB: DeleteTableDataPoint
      ) => {
        return sortCardNumbers(
          rowA.card.cardData.number,
          rowB.card.cardData.number
        );
      },
      grow: 1,
      minWidth: "auto",
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
      grow: 4,
    },

    {
      name: "Team",
      cell: (row: DeleteTableDataPoint) =>
        row.card.cardData.team ? row.card.cardData.team.name : "-",
      sortable: false,
      style: modifiedStyles,
      grow: 4,
    },
    {
      name: "Parallel Set",
      selector: (row: DeleteTableDataPoint) => row.card.series.name,
      sortable: true,
      style: modifiedStyles,
      grow: 4,
      omit: hideParallel,
    },
  ];
};

export const rowDisabledCriteria = (row: TableDataPoint) => row.quantity === 0;
