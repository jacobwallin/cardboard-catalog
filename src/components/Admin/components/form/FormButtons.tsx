import styled from "styled-components";
import React from "react";
import StyledButton from "../StyledButton";

const FormButtonContainer = styled.div`
  display: flex;
  column-gap: 1em;
  margin-top: 20px;
`;

interface FormButtonProps {
  disabled: boolean;
  handleCancel(): void;
  handleSubmit(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return (
    <FormButtonContainer>
      <StyledButton
        onClick={props.handleCancel}
        color="YELLOW"
        disabled={props.disabled}
      >
        Cancel
      </StyledButton>
      <StyledButton
        onClick={props.handleSubmit}
        color="GREEN"
        disabled={props.disabled}
      >
        Save
      </StyledButton>
    </FormButtonContainer>
  );
}
