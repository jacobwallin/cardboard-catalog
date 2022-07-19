import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: white;
    background-color: rgb(232,234,239);
    margin: 0;
  }
  * {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`;

export default GlobalStyles;
