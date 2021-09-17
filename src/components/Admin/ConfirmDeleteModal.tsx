import React from "react";
import styled from "styled-components";

import ModalBackground from "./components/modal/Background";

const ModalWindow = styled.div`
  position: fixed;
  width: 400px;
  height: 250px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  background: lightgrey;
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
  padding: 10px;
  font-size: 1.1em;
`;

const ModalLoadingIndicator = styled.div`
  position: fixed;
  width: 400px;
  height: 250px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 1.6em;
  font-weight: 700;
  /* background: lightgrey; */
`;

interface Props {
  message: string;
  isDeleting: boolean;
  handleDelete: any;
  handleDismiss: any;
}

export default function ConfirmDeleteModal(props: Props) {
  // modal window will either display a popup to let the user confirm deletion, or a loading indicator if deletion is in progress
  return (
    <ModalBackground>
      {props.isDeleting ? (
        <ModalLoadingIndicator>{`Deleting...`}</ModalLoadingIndicator>
      ) : (
        <ModalWindow>
          <ModalPrimaryMessage>
            Are you sure you want to delete?
          </ModalPrimaryMessage>
          <ModalSecondaryMessage>{props.message}</ModalSecondaryMessage>
          <button onClick={props.handleDismiss}>Cancel</button>
          <button onClick={props.handleDelete}>Delete</button>
        </ModalWindow>
      )}
    </ModalBackground>
  );
}
