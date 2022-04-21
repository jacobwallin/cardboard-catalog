import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user/thunks";
import styled from "styled-components";

const Logout = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  margin-right: 15px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  return <Logout onClick={handleLogout}>Logout</Logout>;
}
