import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user/thunks";

import StyledButton from "../Admin/components/StyledButton";

export default function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <StyledButton
      width="100px"
      height="30px"
      color="GRAY"
      onClick={handleLogout}
    >
      Logout
    </StyledButton>
  );
}
