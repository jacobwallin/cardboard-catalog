import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchMe } from "../../store/user/thunks";

import * as Styled from "./styled";
import LogoutButton from "./logout/LogoutButton";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (user.id === 0) {
      dispatch(fetchMe());
    }
  }, []);

  const [hamburgerActive, setHamburgerActive] = useState(false);

  function toggleHamburgerActive() {
    setHamburgerActive(!hamburgerActive);
  }

  return (
    <Styled.Nav>
      <Styled.SiteName>Cardboard Catalog</Styled.SiteName>

      {user.id !== 0 && (
        <>
          <Styled.HamburgerTouchArea onClick={toggleHamburgerActive} />
          <Styled.Hamburger active={hamburgerActive} />
          <Styled.NavMenu active={hamburgerActive}>
            <Styled.StyledLink
              to="/collection"
              className="navbar-link"
              onClick={toggleHamburgerActive}
            >
              Collection
            </Styled.StyledLink>
            <Styled.StyledLink
              to="/transactions"
              className="navbar-link"
              onClick={toggleHamburgerActive}
            >
              Add Cards
            </Styled.StyledLink>
            <LogoutButton />
            {user.isAdmin && (
              <Styled.StyledLink
                to="/admin"
                className="navbar-link"
                onClick={toggleHamburgerActive}
              >
                Admin
              </Styled.StyledLink>
            )}
          </Styled.NavMenu>
        </>
      )}
    </Styled.Nav>
  );
}
