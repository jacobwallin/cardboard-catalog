import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  disabled: boolean;
  handleCancel(): void;
  handleSubmit(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleCancel}
        color="GRAY"
        width="110px"
        height="27px"
      >
        Cancel
      </StyledButton>
      <StyledButton
        onClick={props.handleSubmit}
        color="GREEN"
        disabled={props.disabled}
        width="110px"
        height="27px"
      >
        Save
      </StyledButton>
    </ButtonContainer>
  );
}
