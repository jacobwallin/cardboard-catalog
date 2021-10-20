import React from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import * as Styled from "./styled";

interface Props {
  title: string;
  subTitle?: string;
}

export default function CollectionHeader(props: Props) {
  const match = useRouteMatch("/collection/filter");
  return (
    <Styled.Container>
      <Styled.StyledHeader>{props.title}</Styled.StyledHeader>
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
    </Styled.Container>
  );
}
