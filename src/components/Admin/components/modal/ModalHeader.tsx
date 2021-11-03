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
  font-weight: 700;
  font-size: 1.4em;
  text-align: center;
`;

const Close = styled.div`
  width: 30px;
  height: 30px;
  align-self: flex-end;
  position: absolute;
  right: 5px;
  top: -15px;
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
