import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  background: rgb(60, 134, 255);
  padding: 5px 10px;
  border-radius: 3px;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  to: string;
}

export default function EditLink(props: Props) {
  return <StyledLink to={props.to}>Edit</StyledLink>;
}
