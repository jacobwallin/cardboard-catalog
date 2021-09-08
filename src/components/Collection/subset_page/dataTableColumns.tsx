import tableStyles from "../shared/dataTableStyles";

const columns = [
  {
    name: "Card #",
    selector: "cardData.number",
    sortable: true,
    style: tableStyles,
    grow: 0,
    sortFunction: (a: string, b: string) => {
      return +b - +a;
    },
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
