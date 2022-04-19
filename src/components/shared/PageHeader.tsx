import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
`;

export const StyledHeader = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  margin-left: 10px;
  color: #5a9bfd;
  @media only screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

interface Props {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export default function PageHeader(props: Props) {
  return (
    <Container>
      <StyledHeader>{props.title}</StyledHeader>
      {props.children}
    </Container>
  );
}
