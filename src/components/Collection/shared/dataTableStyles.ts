import { createTheme } from "react-data-table-component";

createTheme("grey", {
  text: {
    primary: "#000000",
    secondary: "#000000",
  },
  background: {
    default: "#ffffff",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#999999",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

export const tableStyles = {
  fontSize: "12px",
};

export const customStyles = {
  headRow: {
    style: {
      minHeight: "35px",
    },
  },
};

export default tableStyles;
