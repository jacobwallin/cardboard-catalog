import React from "react";
import * as Styled from "./styled";

interface Props {
  collectionSelected: boolean;
  handleLeftClick(): void;
  handleRightClick(): void;
  leftText: string;
  rightText: string;
}

export default function PageToggle(props: Props) {
  const {
    handleLeftClick,
    handleRightClick,
    leftText,
    rightText,
    collectionSelected,
  } = props;
  return (
    <Styled.FilterBrowse>
      <Styled.StyledLink
        onClick={handleLeftClick}
        location="LEFT"
        selected={!collectionSelected}
      >
        {leftText}
      </Styled.StyledLink>
      <Styled.StyledLink
        onClick={handleRightClick}
        location="RIGHT"
        selected={collectionSelected}
      >
        {rightText}
      </Styled.StyledLink>
    </Styled.FilterBrowse>
  );
}
