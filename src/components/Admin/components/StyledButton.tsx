import styled from "styled-components";
interface ButtonProps {
  color: "BLUE" | "GREEN" | "YELLOW" | "RED";
  height?: string;
  width?: string;
}

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  color: #fff;
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
  box-shadow: 0 0.125rem 0.625rem rgb(63 106 216 / 40%),
    0 0.0625rem 0.125rem rgb(63 106 216 / 50%);
  border: none;
  border-radius: 3px;
  cursor: pointer;
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
  &:focus {
    outline: none !important;
  }
`;
export default StyledButton;
