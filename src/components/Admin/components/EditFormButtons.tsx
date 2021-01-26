import styled from "styled-components";
import React from "react";

type ButtonStyles = "EDIT" | "SAVE" | "CANCEL" | "DELETE";

const StyledButton = styled.button<{ buttonType: ButtonStyles }>`
  width: 65px;
  background: ${(props) => {
    switch (props.buttonType) {
      case "EDIT":
        return "#2e86ab";
      case "SAVE":
        return "#758E4F";
      case "CANCEL":
        return "#F5F749";
      case "DELETE":
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

const FormButtonContainer = styled.div`
  display: flex;
  column-gap: 1em;
`;

const EditDeleteButtonContainer = styled.div`
  display: flex;
  column-gap: 1em;
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
        buttonType="CANCEL"
        disabled={props.isUpdating}
      >
        Cancel
      </StyledButton>
      <StyledButton
        onClick={props.handleFormSubmit}
        buttonType="SAVE"
        disabled={props.isUpdating || !props.changesMade}
      >
        Save
      </StyledButton>
    </FormButtonContainer>
  ) : (
    <EditDeleteButtonContainer>
      <StyledButton onClick={props.handleEditStateChange} buttonType="EDIT">
        Edit
      </StyledButton>
      <StyledButton onClick={props.handleDelete} buttonType="DELETE">
        Delete
      </StyledButton>
    </EditDeleteButtonContainer>
  );
}
