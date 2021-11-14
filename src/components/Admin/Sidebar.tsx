import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background: #2d3240;
  /* border-right: 2px solid white; */
  @media only screen and (max-width: 800px) {
    flex-direction: row;
    width: 100%;
    height: 40px;
    align-items: center;
  }
`;

interface Mobile {
  visible: boolean;
}

const LinkContainer = styled.div<Mobile>`
  display: flex;
  flex-direction: column;
  width: 200px;

  @media only screen and (max-width: 800px) {
    display: ${({ visible }) => !visible && "none"};
    position: absolute;
    background: #2d3240;
    top: 90px;
    z-index: 3;
    width: 220px;
    box-shadow: 0 10px 20px -5px rgba(16, 16, 16, 0.2);
  }
`;

const StyledAdminLink = styled(Link)`
  color: white;
  font-size: 0.9rem;
  height: 40px;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #252a38;
  }

  &:active {
    background: #252a38;
  }
  /* @media only screen and (max-width: 800px) {
    display: none;
  } */
`;

const AdminPanelHeader = styled.div<Mobile>`
  color: white;
  align-self: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  @media only screen and (max-width: 800px) {
    margin: 0px;
    margin-left: 20px;
    padding: 5px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #888;
    }
  }
`;

export default function Sidebar() {
  const { path } = useRouteMatch();
  const [showAdminMenuOnMobile, setShowAdminMenuOnMobile] = useState(false);

  function toggleAdminMenuOnMobile() {
    setShowAdminMenuOnMobile(!showAdminMenuOnMobile);
  }
  return (
    <SidebarContainer>
      <AdminPanelHeader
        visible={showAdminMenuOnMobile}
        onClick={toggleAdminMenuOnMobile}
      >
        Admin
      </AdminPanelHeader>
      <LinkContainer
        visible={showAdminMenuOnMobile}
        onClick={toggleAdminMenuOnMobile}
      >
        <StyledAdminLink to={`${path}/`}>Set Library</StyledAdminLink>
        <StyledAdminLink to={`${path}/players`}>Player Library</StyledAdminLink>
      </LinkContainer>
    </SidebarContainer>
  );
}
