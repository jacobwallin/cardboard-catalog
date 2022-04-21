import { TableDataPoint } from "../createTableData";

const conditionalRowStyles = [
  {
    when: (row: TableDataPoint) => row.quantity < 1,
    style: {
      opacity: 0.6,
      "&:hover": {
        color: "grey",
      },
    },
  },
];

export default conditionalRowStyles;
