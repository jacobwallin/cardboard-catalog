import styled from "styled-components";

type ButtonStyles = "BLUE" | "GREEN" | "YELLOW" | "RED";

const StyledButton = styled.button<{ color: ButtonStyles }>`
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
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:active {
    opacity: 80%;
  }
  &:focus {
    outline: none !important;
  }
`;
export default StyledButton;
