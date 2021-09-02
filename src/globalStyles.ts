import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    background-color: #eff2f4;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    font-family: arial, sans-serif;
  }
`;

export default GlobalStyles;
