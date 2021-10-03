import tableStyles from "../shared/dataTableStyles";
import { UserCard } from "../../../store/collection/filter/types";

const columns = [
  {
    name: "Card #",
    selector: (row: UserCard) => row.card.card_datum.number,
    sortable: true,
    style: tableStyles,
    compact: true,
    grow: 1,
  },
  {
    name: "Name",
    selector: (row: UserCard) => row.card.card_datum.name,
    sortable: true,
    style: tableStyles,
    compact: true,
    grow: 2,
  },
  {
    name: "Set",
    selector: (row: UserCard) => row.card.series.subset.set.name,

    sortable: true,
    style: tableStyles,
    compact: true,
    grow: 2,
  },
  {
    name: "Subset",
    selector: (row: UserCard) => row.card.series.subset.name,
    sortable: true,
    style: tableStyles,
    compact: true,
    grow: 2,
  },
  {
    name: "Date Added",
    selector: (row: UserCard) => row.createdAt,
    cell: (row: UserCard) => row.createdAt.slice(0, 10),
    sortable: true,
    style: tableStyles,
    compact: true,
    grow: 1,
  },
];

export default columns;
