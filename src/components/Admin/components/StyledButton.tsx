import styled from "styled-components";
interface ButtonProps {
  color: "BLUE" | "GREEN" | "YELLOW" | "RED";
  height?: string;
  width?: string;
}

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  width: 65px;
  height: ${(props) => props.height};
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
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    /* opacity: 80%; */
    background: #2955c8;
  }
  &:active {
    background: #2651be;
  }
  &:focus {
    outline: none !important;
  }
`;
export default StyledButton;
