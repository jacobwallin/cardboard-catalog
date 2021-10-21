import React from "react";
import StyledButton from "../StyledButton";
import ButtonContainer from "./ButtonContainer";

interface FormButtonProps {
  handleEdit(): void;
  handleDelete(): void;
  hideDelete?: boolean;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={props.handleEdit}
        color="BLUE"
        width="100px"
        height="27px"
      >
        Edit
      </StyledButton>
      {!props.hideDelete && (
        <StyledButton
          onClick={props.handleDelete}
          color="RED"
          width="100px"
          height="27px"
        >
          Delete
        </StyledButton>
      )}
    </ButtonContainer>
  );
}
