import React from "react";
import * as Styled from "./styled";

interface Props {
  collectionSelected: boolean;
  handleBrowseClick(): void;
  handleCollectionClick(): void;
}

export default function SubsetViewToggle(props: Props) {
  return (
    <Styled.FilterBrowse>
      <Styled.StyledLink
        onClick={props.handleBrowseClick}
        location="LEFT"
        selected={!props.collectionSelected}
      >
        Checklist
      </Styled.StyledLink>
      <Styled.StyledLink
        onClick={props.handleCollectionClick}
        location="RIGHT"
        selected={props.collectionSelected}
      >
        Collection
      </Styled.StyledLink>
    </Styled.FilterBrowse>
  );
}
