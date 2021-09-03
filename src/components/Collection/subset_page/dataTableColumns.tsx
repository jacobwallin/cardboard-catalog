import tableStyles from "../shared/dataTableStyles";

const columns = [
  {
    name: "Card #",
    selector: "card.card_datum.number",
    sortable: true,
    style: tableStyles,
    grow: 0,
  },
  {
    name: "Card Name",
    selector: "card.card_datum.name",
    sortable: true,
    style: tableStyles,
    grow: 2,
  },
];

export default columns;
