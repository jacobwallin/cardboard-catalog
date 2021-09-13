import styled from "styled-components";
interface ButtonProps {
  color: "BLUE" | "GREEN" | "YELLOW" | "RED";
  height?: string;
  width?: string;
  fontSize?: string;
}

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:focus {
    outline: none !important;
  }
  font-size: ${(props) => props.fontSize || "1em"};
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
        return "#3f6ad8";
      case "GREEN":
        return "#758E4F";
      case "YELLOW":
        return "#F5F749";
      case "RED":
        return "#F24236";
    }
  }};
  &:hover {
    background: ${(props) => {
      switch (props.color) {
        case "BLUE":
          return "#2955c8";
        case "GREEN":
          return "#5C7536";
        case "YELLOW":
          return "#DCDE30";
        case "RED":
          return "#D9291D";
      }
    }};
  }
  &:active {
    background: ${(props) => {
      switch (props.color) {
        case "BLUE":
          return "#2651be";
        case "GREEN":
          return "#294203";
        case "YELLOW":
          return "#A9AB00";
        case "RED":
          return "#A60000";
      }
    }};
  }
  box-shadow: ${(props) => {
    switch (props.color) {
      case "BLUE":
        return `0 0.125rem 0.625rem rgb(63 106 216 / 40%),
    0 0.0625rem 0.125rem rgb(63 106 216 / 50%);`;
      case "GREEN":
        return `0 0.125rem 0.625rem rgb(117 142 79 / 40%),
    0 0.0625rem 0.125rem rgb(117 142 79 / 50%);`;
      case "YELLOW":
        return `0 0.125rem 0.625rem rgb(245 247 73 / 40%),
    0 0.0625rem 0.125rem rgb(245 247 73 / 50%);`;
      case "RED":
        return `0 0.125rem 0.625rem rgb(242 66 54 / 40%),
    0 0.0625rem 0.125rem rgb(242 66 54 / 50%);`;
    }
  }};
`;
export default StyledButton;
