import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    background-color: rgb(232,234,239);
    margin: 0;
  }
  * {
    box-sizing: border-box;
    font-family: arial, sans-serif;
  }
`;

export default GlobalStyles;
