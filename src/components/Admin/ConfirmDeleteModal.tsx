import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  /* opacity: 0.9; */
  background: rgba(255, 255, 255, 0.6);
`;

const ModalWindow = styled.div`
  position: fixed;
  width: 400px;
  height: 250px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  background: grey;
  border-radius: 15px;
`;

interface Props {
  message: string;
  handleDelete: any;
  handleDismiss: any;
}

export default function ConfirmDeleteModal(props: Props) {
  return (
    <ModalBackground>
      <ModalWindow>
        {props.message}
        <button onClick={props.handleDismiss}>Cancel</button>
      </ModalWindow>
    </ModalBackground>
  );
}
