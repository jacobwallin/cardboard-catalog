import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: auto;
  background: #ddd;
  margin: 15px;
  border: 1px solid black;
`;

export default function Sidebar() {
  const { path } = useRouteMatch();
  return (
    <SidebarContainer>
      <Link to={`${path}/`}>Sets</Link>
      <Link to={`${path}/teams`}>Teams</Link>
      <Link to={`${path}/attributes`}>Card Attributes</Link>
      <Link to={`${path}/brands`}>Brands</Link>
    </SidebarContainer>
  );
}
