import React from "react";
import styled from "styled-components";
import { ReactComponent as XIcon } from "./close.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px 0 0 0;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
`;

const Close = styled.div`
  width: 30px;
  height: 30px;
  align-self: flex-end;
  position: absolute;
  right: -10px;
  top: -15px;
  cursor: pointer;
  &:hover {
    .ex {
      fill: gray;
    }
  }
  &:active {
    .ex {
      fill: darkgray;
    }
  }
`;
interface Props {
  title: string;
  handleClose(): void;
}

export default function ModalHeader(props: Props) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Close onClick={props.handleClose}>
        <XIcon />
      </Close>
    </Container>
  );
}
