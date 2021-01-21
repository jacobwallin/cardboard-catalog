import React from "react";
import styled from "styled-components";

const DeleteDiv = styled.div`
  background: #f47575;
  padding: 5px 10px;
  border-radius: 3px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }s
`;

interface Props {}

export default function DeleteButton() {
  return <DeleteDiv>Delete</DeleteDiv>;
}
