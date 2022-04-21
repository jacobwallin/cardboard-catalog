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
  box-shadow: 0 0.125rem 0.625rem rgb(0 74 206 / 40%),
    0 0.0625rem 0.125rem rgb(0 74 206 / 50%);
  &:hover {
    background: #0031b5;
  }
  &:active {
    background: #000082;
  }
`;

interface Props {
  to: string;
  view?: boolean;
}

export default function EditLink(props: Props) {
  return <StyledLink to={props.to}>{props.view ? "View" : "Edit"}</StyledLink>;
}
