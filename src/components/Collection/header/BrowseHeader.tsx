import React from "react";
import * as Styled from "./styled";

interface Props {
  title: string;
  subTitle?: string;
}

export default function BrowseHeader(props: Props) {
  return (
    <Styled.Container>
      <Styled.StyledHeader>{props.title}</Styled.StyledHeader>
    </Styled.Container>
  );
}
