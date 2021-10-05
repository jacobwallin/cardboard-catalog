import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 10px;
`;

const StyledHeader = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  margin-left: 10px;
  color: #5a9bfd;
`;

const FilterBrowse = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)<{ location: "LEFT" | "RIGHT" }>`
  width: 80px;
  height: 25px;
  font-size: 0.9rem;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #5a9bfd;
  &:hover {
    background-color: #4182e4;
  }
  &:active {
    background-color: #0e4fb1;
  }
  &:visited {
    color: white;
  }
  border-left: ${(props) => props.location === "RIGHT" && "1px solid grey"};
  border-top-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-bottom-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-top-right-radius: ${(props) => props.location === "RIGHT" && "13px"};
  border-bottom-right-radius: ${(props) =>
    props.location === "RIGHT" && "13px"};
`;

function CollectionHeader() {
  return (
    <Container>
      <StyledHeader>Your Collection</StyledHeader>
      <FilterBrowse>
        <StyledLink to="/collection/filter" location="LEFT">
          Filter
        </StyledLink>
        <StyledLink to="/collection" location="RIGHT">
          Browse
        </StyledLink>
      </FilterBrowse>
    </Container>
  );
}

export default CollectionHeader;
