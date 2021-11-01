import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchMe } from "../../store/user/thunks";

import * as Styled from "./styled";
import LogoutButton from "./logout/LogoutButton";
import * as styled from "./styled";

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
    <>
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
                to="/add"
                className="navbar-link"
                onClick={toggleHamburgerActive}
              >
                Quick Add
              </Styled.StyledLink>
              <Styled.StyledLink
                to="/browse"
                className="navbar-link"
                onClick={toggleHamburgerActive}
              >
                Browse
              </Styled.StyledLink>
              {user.isAdmin && (
                <Styled.StyledLink
                  to="/admin"
                  className="navbar-link"
                  onClick={toggleHamburgerActive}
                >
                  Admin
                </Styled.StyledLink>
              )}
              <LogoutButton />
            </Styled.NavMenu>
          </>
        )}
      </Styled.Nav>
      {user.id === 7 && (
        <styled.Demo>
          <styled.DemoHeader>Demo Mode - Admin User</styled.DemoHeader>
          <styled.DemoInfo>
            Admin pages are available but requests to create or edit will be
            rejected.
          </styled.DemoInfo>
        </styled.Demo>
      )}
    </>
  );
}
