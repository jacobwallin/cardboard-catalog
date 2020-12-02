import styled from "styled-components";

type ButtonStyles = "EDIT" | "SAVE" | "CANCEL";

const StyledButton = styled.button<{ buttonType: ButtonStyles }>`
  width: 65px;
  background: ${(props) => {
    switch (props.buttonType) {
      case "EDIT":
        return "#5d9bfc";
      case "SAVE":
        return "#1e6824";
      case "CANCEL":
        return "#e2df28";
    }
  }};
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    opacity: 80%;
  }
`;

export default StyledButton;
