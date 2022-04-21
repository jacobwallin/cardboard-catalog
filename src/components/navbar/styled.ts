import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  background-color: #004cce;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  height: 50px;
`;

export const SiteName = styled.div`
  margin: 0 0 0 10px;
  color: white;
  flex-grow: 1;
  font-weight: 600;
  font-size: 1.4em;
  @media only screen and (max-width: 800px) {
    font-size: 1.5em;
  }
`;

export const StyledLink = styled(Link)`
  flex-grow: 0;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  align-items: flex-start;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Hamburger = styled.span<NavMenuProps>`
  display: none;
  position: relative;
  z-index: 20;
  margin-right: 10px;

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
    transform: ${({ active }) => active && "translate(0px, 9px);"};
    transition: transform 0.15s cubic-bezier(0.41, 0.17, 0.88, 0.53);
  }

  &:after {
    top: 9px;
    transform: ${({ active }) => active && "translate(0px, -9px);"};
    transition: transform 0.15s cubic-bezier(0.41, 0.17, 0.88, 0.53);
  }

  @media only screen and (max-width: 800px) {
    display: block;
  }
`;

export const HamburgerTouchArea = styled.div`
  display: none;
  position: absolute;
  height: 50px;
  width: 55px;
  top: 0;
  right: 0;
  z-index: 4;
  @media only screen and (max-width: 800px) {
    display: block;
  }
`;

interface NavMenuProps {
  active: boolean;
}

export const NavMenu = styled.div<NavMenuProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 3;
  gap: 25px;
  height: 100%;
  margin-right: 15px;

  @media only screen and (max-width: 800px) {
    margin-right: 0;
    padding-left: 15px;
    flex-direction: column;
    align-items: flex-start;
    background-color: rgb(0, 74, 206);
    position: fixed;
    transform: ${({ active }) =>
      active ? "translateX(0)" : "translateX(100%)"};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.15s cubic-bezier(0.41, 0.17, 0.88, 0.53);
  }
`;

export const Demo = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fc9903;
  height: 35px;
  top: 0;
  z-index: 2;
`;

export const DemoHeader = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

export const DemoInfo = styled.div`
  font-size: 0.7rem;
`;

export const ProfileIcon = styled.div`
  width: 30px;
  path {
    fill: white;
  }
`;
