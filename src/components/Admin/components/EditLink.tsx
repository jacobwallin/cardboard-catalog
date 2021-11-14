import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  background: #004ace;
  padding: 5px 10px;
  border-radius: 3px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    background: #0031b5;
  }
  &:active {
    background: #000082;
  }
`;

interface Props {
  to: string;
}

export default function EditLink(props: Props) {
  return <StyledLink to={props.to}>Edit</StyledLink>;
}
