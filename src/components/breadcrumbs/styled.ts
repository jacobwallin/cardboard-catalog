import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BreadcrumbsContainer = styled.div`
  width: 100%;
`;

export const BreadcrumbLink = styled(Link)`
  color: gray;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
