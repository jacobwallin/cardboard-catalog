import tableStyles from "../../shared/dataTableStyles";
import { TableDataPoint } from "../createTableData";

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

const columns = [
  {
    name: "Card #",
    selector: (row: TableDataPoint) => row.cardData.number,
    sortable: true,
    style: modifiedStyles,
    grow: 1,
    sortFunction: customColumnSort,
  },
  {
    name: "Name",
    selector: (row: TableDataPoint) => row.cardData.name,
    sortable: true,
    style: modifiedStyles,
    grow: 2,
  },
  {
    name: "Team",
    cell: (row: TableDataPoint) =>
      row.cardData.team ? row.cardData.team.name : "-",
    sortable: true,
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

export default columns;