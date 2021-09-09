import { TableDataPoint } from "./createTableData";

const conditionalRowStyles = [
  {
    when: (row: TableDataPoint) => row.quantity < 1,
    style: {
      color: "grey",
      "&:hover": {
        color: "grey",
      },
    },
  },
];

export default conditionalRowStyles;
