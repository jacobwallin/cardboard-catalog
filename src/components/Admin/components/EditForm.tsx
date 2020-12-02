import React from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";

export const EditFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-width: 750px;
  max-width: 1200px;
`;

const LineItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const LineItemTitle = styled.div`
  font-weight: bold;
  min-width: 150px;
  width: 25%;
`;

const LineItemData = styled.div`
  font-weight: normal;
  width: 75%;
`;

interface FormLineProps {
  title: string;
  data: string | number;
  editing: boolean;
  input: any;
}

export function EditFormLine(props: FormLineProps) {
  return (
    <LineItem>
      <LineItemTitle>{props.title}</LineItemTitle>
      <LineItemData>{props.editing ? props.input : props.data}</LineItemData>
    </LineItem>
  );
}

interface FormButtonProps {
  isEditing: boolean;
  isUpdating: boolean;
  changesMade: boolean;
  handleEditStateChange(): void;
  handleFormSubmit(): void;
}

export function EditFormButtons(props: FormButtonProps) {
  return props.isEditing ? (
    <>
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
    </>
  ) : (
    <StyledButton onClick={props.handleEditStateChange} buttonType="EDIT">
      Edit
    </StyledButton>
  );
}
