import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchMe } from "../store/user/thunks";

import "../styling/navbar.css";

const Nav = styled.div`
  background-color: #80b3ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  height: 50px;
`;

const SiteName = styled.div`
  margin: 0 0 0 10px;
  flex-grow: 1;
  font-weight: 600;
  font-size: 2em;
  @media only screen and (max-width: 700px) {
    font-size: 1.5em;
  }
`;

const Hamburger = styled.span`
  display: none;
  position: relative;
  z-index: 20;

  &:before,
  &:after,
  & {
    width: 2em;
    height: 3px;
    background: black;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
  }

  &:before {
    bottom: 9px;
  }

  &:after {
    top: 9px;
  }

  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

interface NavMenuProps {
  active: boolean;
}

const NavMenu = styled.div<NavMenuProps>`
  display: flex;
  flex-direction: row;
  z-index: 2;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    background-color: #a8abad;
    position: fixed;
    transform: ${({ active }) =>
      active ? "translateX(0)" : "translateX(100%)"};
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding-top: 3.5rem;
    /* transition: transform 0.3s ease-in-out; */
  }
`;

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
    <Nav>
      <SiteName>Cardboard Catalog</SiteName>

      {user.id !== 0 ? (
        <>
          <Hamburger onClick={toggleHamburgerActive} />
          <NavMenu active={hamburgerActive}>
            <Link
              to="/collection"
              className="navbar-link"
              onClick={toggleHamburgerActive}
            >
              My Collection
            </Link>
            <Link
              to="/transactions"
              className="navbar-link"
              onClick={toggleHamburgerActive}
            >
              Add Cards
            </Link>
            {user.isAdmin && (
              <Link
                to="/admin"
                className="navbar-link"
                onClick={toggleHamburgerActive}
              >
                Admin
              </Link>
            )}
          </NavMenu>
        </>
      ) : (
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      )}
    </Nav>
  );
}
