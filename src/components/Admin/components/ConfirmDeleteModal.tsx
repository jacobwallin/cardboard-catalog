import React from "react";
import styled from "styled-components";
import { LoadingDots } from "../../shared/Loading";
import StyledButton from "./StyledButton";
import ModalBackground from "../../shared/Background";

const ModalWindow = styled.div`
  position: fixed;
  width: 400px;
  height: 250px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ModalPrimaryMessage = styled.div`
  padding: 10px;
  font-size: 1.5em;
  font-weight: 700;
`;

const ModalSecondaryMessage = styled.div`
  padding: 20px;
  font-size: 1.1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

interface Props {
  message: string;
  deleteStatus: string;
  handleDelete(): void;
  handleDismiss(): void;
}

export default function ConfirmDeleteModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        {props.deleteStatus === "REQUEST" ? (
          <LoadingDots />
        ) : (
          <>
            <ModalPrimaryMessage>Confirm Delete</ModalPrimaryMessage>
            <ModalSecondaryMessage>{props.message}</ModalSecondaryMessage>
            <ButtonContainer>
              <StyledButton
                color="RED"
                width="100px"
                height="27px"
                onClick={props.handleDelete}
              >
                Delete
              </StyledButton>
              <StyledButton
                color="YELLOW"
                width="100px"
                height="27px"
                onClick={props.handleDismiss}
              >
                Cancel
              </StyledButton>
            </ButtonContainer>
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
