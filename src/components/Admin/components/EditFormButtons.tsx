import styled from "styled-components";
import React from "react";
import StyledButton from "./StyledButton";

const FormButtonContainer = styled.div`
  display: flex;
  column-gap: 1em;
  margin-top: 20px;
`;

const EditDeleteButtonContainer = styled.div`
  display: flex;
  column-gap: 1em;
  margin-top: 20px;
  justify-content: space-between;
`;

interface FormButtonProps {
  isEditing: boolean;
  isUpdating: boolean;
  changesMade: boolean;
  handleEditStateChange(): void;
  handleFormSubmit(): void;
  handleDelete?(): void;
}

export default function EditFormButtons(props: FormButtonProps) {
  return props.isEditing ? (
    <FormButtonContainer>
      <StyledButton
        onClick={props.handleEditStateChange}
        color="YELLOW"
        disabled={props.isUpdating}
      >
        Cancel
      </StyledButton>
      <StyledButton
        onClick={props.handleFormSubmit}
        color="GREEN"
        disabled={props.isUpdating || !props.changesMade}
      >
        Save
      </StyledButton>
    </FormButtonContainer>
  ) : (
    <EditDeleteButtonContainer>
      <StyledButton onClick={props.handleEditStateChange} color="BLUE">
        Edit
      </StyledButton>
      <StyledButton onClick={props.handleDelete} color="RED">
        Delete
      </StyledButton>
    </EditDeleteButtonContainer>
  );
}
