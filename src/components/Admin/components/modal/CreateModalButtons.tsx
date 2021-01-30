import React from "react";
import styled from "styled-components";

import StyledButton from "../StyledButton";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20%;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

interface Props {
  disabled: boolean;
  handleCancel(): any;
  handleSubmit(): any;
}

export default function CreateModalButtons(props: Props) {
  return (
    <ButtonContainer>
      <StyledButton
        color="YELLOW"
        onClick={props.handleCancel}
        disabled={props.disabled}
      >
        Cancel
      </StyledButton>
      <StyledButton
        color="GREEN"
        onClick={props.handleSubmit}
        disabled={props.disabled}
      >
        Create
      </StyledButton>
    </ButtonContainer>
  );
}
