import React from "react";
import styled from "styled-components";
import Close from "./close.svg";

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  align-self: center;
`;

const CloseWrapper = styled.div`
  width: 30px;
  height: 30px;
  align-self: flex-end;
`;

interface Props {
  title: string;
  handleClose(): void;
}

export default function CardFormHeader(props: Props) {
  return (
    <Header>
      <Title>{props.title}</Title>
      <CloseWrapper onClick={props.handleClose}>
        <img src={Close} alt="close" />
      </CloseWrapper>
    </Header>
  );
}
