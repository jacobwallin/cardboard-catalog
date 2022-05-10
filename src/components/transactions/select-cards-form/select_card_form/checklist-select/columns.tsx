import React from "react";
import {
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../../Collection/subset-page/createTableData";
import CardNumber from "../../../../Collection/subset-page/CardNumber";
import sortCardNumbers from "../../../../../utils/sortCardNumbers";

export const addColumns = (
  selectedCards: { card: TableDataPoint; qty: number }[],
  handleQtyToAddChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
) => {
  return [
    {
      name: "Qty",
      cell: (row: TableDataPoint) => (
        <select
          name={String(row.id)}
          disabled={!selectedCards.find((card) => card.card.id === row.id)}
          value={
            selectedCards.find((card) => card.card.id === row.id) &&
            selectedCards.find((card) => card.card.id === row.id)!.qty
          }
          onChange={handleQtyToAddChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
      ),
      sortable: true,
      grow: 0,
      minWidth: "auto",
    },
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

export const removeColumns = () => {
  return [
    {
      name: "#",
      selector: (row: DeleteTableDataPoint) => row.card.cardData.number,
      sortable: true,
      cell: (row: DeleteTableDataPoint) => (
        <CardNumber
          number={row.card.cardData.number}
          serialized={row.card.serializedTo || row.card.series.serialized}
          shortPrint={row.shortPrint}
          auto={row.auto}
          relic={row.relic}
          manufacturedRelic={row.manufacturedRelic}
          refractor={row.card.series.refractor}
          rookie={row.card.cardData.rookie}
        />
      ),
      grow: 1,
      sortFunction: (
        rowA: DeleteTableDataPoint,
        rowB: DeleteTableDataPoint
      ) => {
        return sortCardNumbers(
          rowA.card.cardData.number,
          rowB.card.cardData.number
        );
      },
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
      // style: modifiedStyles,
      grow: 2,
    },
    {
      name: "Team",
      cell: (row: DeleteTableDataPoint) =>
        row.card.cardData.team ? row.card.cardData.team.name : "-",
      sortable: true,
      // style: modifiedStyles,
      grow: 2,
    },
  ];
};
