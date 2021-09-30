import React from "react";
import styled from "styled-components";

const Header = styled.div`
  padding-top: 25px;
  padding-bottom: 20px;
  font-size: 1.7rem;
  max-width: 1200px;
  text-align: center;
`;

interface HeaderProps {
  text: string;
}

export default function EditPageHeader(props: HeaderProps) {
  return <Header>{props.text}</Header>;
}
