import React from "react";
import * as Styled from "./styled";

interface Props {
  title: string;
  subTitle?: string;
  handleBrowseClick(): void;
  handleCollectionClick(): void;
}

export default function SubsetHeader(props: Props) {
  return (
    <Styled.Container>
      <Styled.StyledHeader>{props.title}</Styled.StyledHeader>
      <Styled.FilterBrowse>
        <Styled.StyledLink onClick={props.handleBrowseClick} location="LEFT">
          Checklist
        </Styled.StyledLink>
        <Styled.StyledLink
          onClick={props.handleCollectionClick}
          location="RIGHT"
        >
          Collection
        </Styled.StyledLink>
      </Styled.FilterBrowse>
    </Styled.Container>
  );
}
