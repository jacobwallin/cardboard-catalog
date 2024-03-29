import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background: #292929;
  /* border-right: 2px solid white; */
  @media only screen and (max-width: 1100px) {
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

  @media only screen and (max-width: 1100px) {
    display: ${({ visible }) => !visible && "none"};
    position: absolute;
    background: #222;
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
    background: #151515;
  }

  &:active {
    background: #151515;
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
  @media only screen and (max-width: 1100px) {
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
        <StyledAdminLink to="/admin">Sets</StyledAdminLink>
        <StyledAdminLink to="/admin/players">Players</StyledAdminLink>
        <StyledAdminLink to="/admin/teams">Teams</StyledAdminLink>
        <StyledAdminLink to="/admin/other">Other</StyledAdminLink>
      </LinkContainer>
    </SidebarContainer>
  );
}
