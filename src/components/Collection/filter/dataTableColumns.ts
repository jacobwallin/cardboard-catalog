import tableStyles from "../shared/dataTableStyles";
import { UserCard } from "../../../store/collection/filter/types";

const columns = [
  {
    name: "Card #",
    selector: (row: UserCard) => row.card.card_datum.number,
    sortable: true,
    style: tableStyles,
    compact: true,
    // minWidth: "50px",
    // grow: 1,
  },
  {
    name: "Name",
    selector: (row: UserCard) => row.card.card_datum.name,
    sortable: true,
    style: tableStyles,
    compact: true,
  },
  {
    name: "Set",
    selector: (row: UserCard) => row.card.series.subset.set.name,
    sortable: true,
    style: tableStyles,
    compact: true,
  },
  {
    name: "Subset",
    selector: (row: UserCard) => row.card.series.subset.name,
    sortable: true,
    style: tableStyles,
    compact: true,
  },
];

export default columns;
