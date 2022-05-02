import styled from "styled-components";
interface ButtonProps {
  color: "BLUE" | "GREEN" | "YELLOW" | "RED" | "GRAY";
  height?: string;
  width?: string;
  fontSize?: string;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border: none;
  border-radius: 3px;
  font-size: ${(props) => props.fontSize || "0.9rem"};
  &:enabled {
    cursor: pointer;
  }
  &:disabled {
    opacity: 50%;
  }
  &:focus {
    outline: none !important;
  }
  color: ${(props) => {
    switch (props.color) {
      case "YELLOW":
        return "#000";
      default:
        return "#fff";
    }
  }};
  background: ${(props) => {
    switch (props.color) {
      case "BLUE":
        return "#004ACE";
      case "GREEN":
        return "#009900";
      case "YELLOW":
        return "#E6E600";
      case "RED":
        return "#dc3545";
      case "GRAY":
        return "#aaa";
    }
  }};
  &:hover:enabled {
    background: ${(props) => {
      switch (props.color) {
        case "BLUE":
          return "#0031B5";
        case "GREEN":
          return "#008000";
        case "YELLOW":
          return "#CDCD00";
        case "RED":
          return "#B50900";
        case "GRAY":
          return "#808080";
      }
    }};
  }
  &:active:enabled {
    background: ${(props) => {
      switch (props.color) {
        case "BLUE":
          return "#000082";
        case "GREEN":
          return "#004D00";
        case "YELLOW":
          return "#9A9A00";
        case "RED":
          return "#820000";
        case "GRAY":
          return "#4D4D4D";
      }
    }};
  }
  box-shadow: ${(props) => {
    switch (props.color) {
      case "BLUE":
        return `0 0.125rem 0.625rem rgb(0 74 206 / 40%),
    0 0.0625rem 0.125rem rgb(0 74 206 / 50%);`;
      case "GREEN":
        return `0 0.125rem 0.625rem rgb(0 153 0 / 40%),
    0 0.0625rem 0.125rem rgb(0 153 0 / 50%);`;
      case "YELLOW":
        return `0 0.125rem 0.625rem rgb(230 230 0 / 40%),
    0 0.0625rem 0.125rem rgb(230 230 0 / 50%);`;
      case "RED":
        return `0 0.125rem 0.625rem rgb(206 34 0 / 40%),
    0 0.0625rem 0.125rem rgb(206 34 0 / 50%);`;
      case "GRAY":
        return `0 0.125rem 0.625rem rgb(204 204 204 / 40%),
    0 0.0625rem 0.125rem rgb(204 204 204 / 50%);`;
    }
  }};
`;

export default StyledButton;
