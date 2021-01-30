import styled from "styled-components";

type ButtonStyles = "BLUE" | "GREEN" | "YELLOW" | "RED";

const StyledButton = styled.button<{ color: ButtonStyles }>`
  box-sizing: content-box;
  width: 65px;

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
