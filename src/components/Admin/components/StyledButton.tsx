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
  background: ${(props) => {
    switch (props.color) {
      case "BLUE":
        return "#2e86ab";
      case "GREEN":
        return "#758E4F";
      case "YELLOW":
        return "#F5F749";
      case "RED":
        return "#F24236";
    }
  }};
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
  &:active {
    opacity: 80%;
  }
  &:focus {
    outline: none !important;
  }
`;
export default StyledButton;
