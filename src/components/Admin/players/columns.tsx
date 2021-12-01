import { Player } from "../../../store/library/players/types";

const dataTableColumns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "DOB",
    selector: "birthday",
    sortable: true,
  },
  {
    name: "Date Created",
    selector: (row: Player) => row.createdAt.slice(0, 10),
    sortable: true,
  },
];

export default dataTableColumns;
