import React from "react";
import { TableDataPoint } from "../createTableData";
import CardNumber from "../CardNumber";
import sortCardNumbers from "../../../../utils/sortCardNumbers";

const columns = () => {
  return [
    {
      name: "#",
      selector: (row: TableDataPoint) => row.cardData.number,
      sortable: true,
      cell: (row: TableDataPoint) => (
        <CardNumber
          number={row.cardData.number}
          serialized={row.serializedTo || row.series.serialized}
          shortPrint={row.shortPrint}
          auto={row.auto}
          relic={row.relic}
          manufacturedRelic={row.manufacturedRelic}
          refractor={row.series.refractor}
          rookie={row.cardData.rookie}
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
      cell: (row: TableDataPoint) =>
        row.cardData.team ? row.cardData.team.name : "-",
      sortable: true,
      // style: modifiedStyles,
      grow: 2,
    },
  ];
};

export default columns;
