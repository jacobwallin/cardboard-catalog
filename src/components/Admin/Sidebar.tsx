import React from "react";
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
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const AdminPanelHeader = styled.div`
  color: white;
  align-self: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  @media only screen and (max-width: 800px) {
    margin: 0px;
    padding-left: 20px;
  }
`;

export default function Sidebar() {
  const { path } = useRouteMatch();
  return (
    <SidebarContainer>
      <AdminPanelHeader>Admin</AdminPanelHeader>
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
    </SidebarContainer>
  );
}
