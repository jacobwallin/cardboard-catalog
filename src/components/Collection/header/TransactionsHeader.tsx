import React from "react";
import * as Styled from "./styled";

interface Props {
  title: string;
}

export default function TransactionsHeader(props: Props) {
  return (
    <Styled.Container>
      <Styled.StyledHeader>{props.title}</Styled.StyledHeader>
    </Styled.Container>
  );
}
