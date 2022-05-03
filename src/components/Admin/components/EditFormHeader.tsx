import React from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  margin-bottom: 3px;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  word-wrap: break-word;
`;

export const SubHeader = styled.div`
  font-size: 0.95rem;
  margin-bottom: 20px;
  font-weight: 300;
`;

interface HeaderProps {
  text: string;
  subText?: string;
}

export default function EditPageHeader(props: HeaderProps) {
  return (
    <>
      <Header>{props.text}</Header>
      {props.subText && <SubHeader>{props.subText}</SubHeader>}
    </>
  );
}
