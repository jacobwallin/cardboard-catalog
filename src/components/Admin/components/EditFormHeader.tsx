import React from "react";
import styled from "styled-components";

const Header = styled.div`
  /* padding-top: 25px; */
  padding-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  background-color: white;
  width: 100%;
`;

interface HeaderProps {
  text: string;
}

export default function EditPageHeader(props: HeaderProps) {
  return <Header>{props.text}</Header>;
}
