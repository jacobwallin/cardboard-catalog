import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BreadcrumbsContainer = styled.div`
  width: 100%;
  margin: 3px 0 0 15px;
`;

export const BreadcrumbLink = styled(Link)<{ color: string }>`
  color: ${(props) => props.color};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const BreadcrumbSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-decoration: none;
`;
