import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  background: #444;
  margin-right: 15px;
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

  @media only screen and (max-width: 800px) {
    display: ${({ visible }) => !visible && "none"};
    position: absolute;
    background: white;
    top: 90px;
    z-index: 3;
    width: 220px;
    box-shadow: 0 10px 20px -5px rgba(16, 16, 16, 0.2);
  }
`;

const StyledAdminLink = styled(Link)`
  color: #555;
  font-size: 0.9rem;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  text-decoration: none;
  font-weight: bold;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background: #ccc;
  }

  &:active {
    background: #bbb;
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
    &::after {
      content: " >";
      font-size: 0.9rem;
      transform: rotate(0.25turn);
    }
    margin: 0px;
    padding-left: 20px;
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
      <LinkContainer visible={showAdminMenuOnMobile}>
        <StyledAdminLink to={`${path}/`}>
          Set Library<span>&gt;</span>
        </StyledAdminLink>
        <StyledAdminLink to={`${path}/teams`}>
          Player Library<span>&gt;</span>
        </StyledAdminLink>
        <StyledAdminLink to={`${path}/attributes`}>
          Users<span>&gt;</span>
        </StyledAdminLink>
        <StyledAdminLink to={`${path}/brands`}>
          Other Data<span>&gt;</span>
        </StyledAdminLink>
      </LinkContainer>
    </SidebarContainer>
  );
}
