import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  handleEdit(): void;
  handleDelete(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleEdit}
        color="BLUE"
        width="110px"
        height="30px"
      >
        Edit
      </StyledButton>
      <StyledButton
        onClick={props.handleDelete}
        color="RED"
        width="110px"
        height="30px"
      >
        Delete
      </StyledButton>
    </ButtonContainer>
  );
}
