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
];

export default dataTableColumns;
