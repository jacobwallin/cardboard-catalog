import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  disabled: boolean;
  handleSubmit(): void;
  handleCancel?(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleSubmit}
        color="GREEN"
        disabled={props.disabled}
        width="125px"
        height="32px"
      >
        Save
      </StyledButton>
      {props.handleCancel && (
        <StyledButton
          onClick={props.handleCancel}
          color="GRAY"
          width="110px"
          height="27px"
        >
          Cancel
        </StyledButton>
      )}
    </ButtonContainer>
  );
}
