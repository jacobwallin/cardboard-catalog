import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  disabled: boolean;
  handleSubmit(): void;
  handleCancel(): void;
  handleDelete?(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleSubmit}
        color="GREEN"
        disabled={props.disabled}
        width="95px"
        height="27px"
      >
        Save
      </StyledButton>
      <StyledButton
        onClick={props.handleCancel}
        color="GRAY"
        width="95px"
        height="27px"
      >
        Cancel
      </StyledButton>

      {props.handleDelete && (
        <StyledButton
          onClick={props.handleDelete}
          color="RED"
          width="95px"
          height="27px"
        >
          Delete
        </StyledButton>
      )}
    </ButtonContainer>
  );
}
