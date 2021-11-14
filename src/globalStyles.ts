import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  body {
    font-family: "Lato", sans-serif;
    background-color: rgb(232,234,239);
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
