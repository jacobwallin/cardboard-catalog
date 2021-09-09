import tableStyles from "../shared/dataTableStyles";
import { TableDataPoint } from "./createTableData";

const customColumnSort = (rowA: TableDataPoint, rowB: TableDataPoint) => {
  let a: string | number = rowA.cardData.number;
  let b: string | number = rowB.cardData.number;

  // convert to number if possible
  if (+a && +b) {
    a = +a;
    b = +b;
  }

  // compare
  if (a > b) {
    return 1;
  } else if (a > b) {
    return -1;
  }
  return 0;
};

const columns = [
  {
    name: "Card #",
    selector: "cardData.number",
    sortable: true,
    style: tableStyles,
    grow: 0,
    sortFunction: customColumnSort,
  },
  {
    name: "Qty",
    selector: "quantity",
    sortable: true,
    style: tableStyles,
    grow: 0,
  },
  {
    name: "Card Name",
    selector: "cardData.name",
    sortable: true,
    style: tableStyles,
    grow: 1,
  },
  {
    name: "Team",
    selector: "cardData.team.name",
    sortable: true,
    style: tableStyles,
    grow: 1,
  },
];

export default columns;
