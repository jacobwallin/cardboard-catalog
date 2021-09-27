import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/user/thunks";

import { StyledLink } from "../styled";

export default function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <StyledLink as="div" onClick={handleLogout}>
      Logout
    </StyledLink>
  );
}
