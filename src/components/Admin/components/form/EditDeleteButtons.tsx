import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  handleEdit(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleEdit}
        color="BLUE"
        width="95px"
        height="27px"
      >
        Edit
      </StyledButton>
    </ButtonContainer>
  );
}
