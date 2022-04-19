import React from "react";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Styled from "./styled";

export default function CollectionToggle() {
  const match = useMatch("/collection/filter");
  return (
    <Styled.FilterBrowse>
      <Styled.StyledLink
        as={Link}
        to="/collection/filter"
        location="LEFT"
        selected={match !== null}
      >
        Search
      </Styled.StyledLink>
      <Styled.StyledLink
        as={Link}
        to="/collection"
        location="RIGHT"
        selected={match === null}
      >
        Browse
      </Styled.StyledLink>
    </Styled.FilterBrowse>
  );
}
