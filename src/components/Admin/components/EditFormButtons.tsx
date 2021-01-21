import styled from "styled-components";
import React from "react";

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

const FormButtonContainer = styled.div`
  display: flex;
`;

interface FormButtonProps {
  isEditing: boolean;
  isUpdating: boolean;
  changesMade: boolean;
  handleEditStateChange(): void;
  handleFormSubmit(): void;
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
    <StyledButton onClick={props.handleEditStateChange} buttonType="EDIT">
      Edit
    </StyledButton>
  );
}
