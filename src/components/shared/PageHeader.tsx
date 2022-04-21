import React from "react";
import styled from "styled-components";

export const Container = styled.div<{ flexColumn: boolean }>`
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
  @media only screen and (max-width: 450px) {
    padding: 0 5px 0 5px;
    flex-direction: ${(props) => (props.flexColumn ? "column" : "row")};
    gap: ${(props) => props.flexColumn && "8px"};
    align-items: ${(props) => props.flexColumn && "flex-start"};
  }
`;

export const StyledHeader = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  margin-left: 10px;
  color: #5a9bfd;
  @media only screen and (max-width: 450px) {
    font-size: 1.5rem;
    margin-left: 10px;
  }
  @media only screen and (max-width: 375px) {
    font-size: 1.1rem;
    margin-left: 10px;
  }
`;

export const StyledSubHeader = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  margin-left: 15px;
  color: #5a9bfd;
  @media only screen and (max-width: 450px) {
    font-size: 0.9rem;
  }
`;

export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  flexColumn?: boolean;
}

export default function PageHeader(props: Props) {
  return (
    <Container flexColumn={props.flexColumn || false}>
      <TitlesContainer>
        <StyledHeader>{props.title}</StyledHeader>
        <StyledSubHeader>{props.subTitle}</StyledSubHeader>
      </TitlesContainer>
      {props.children}
    </Container>
  );
}
