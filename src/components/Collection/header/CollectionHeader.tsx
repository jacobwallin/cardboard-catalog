import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./styled";

interface Props {
  title: string;
  subTitle?: string;
}

export default function CollectionHeader(props: Props) {
  return (
    <Styled.Container>
      <Styled.StyledHeader>{props.title}</Styled.StyledHeader>
      <Styled.FilterBrowse>
        <Styled.StyledLink as={Link} to="/collection/filter" location="LEFT">
          Search
        </Styled.StyledLink>
        <Styled.StyledLink as={Link} to="/collection" location="RIGHT">
          Browse
        </Styled.StyledLink>
      </Styled.FilterBrowse>
    </Styled.Container>
  );
}
