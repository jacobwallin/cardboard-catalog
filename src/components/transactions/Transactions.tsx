import React from "react";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import * as Styled from "./styled";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Styled.TransactionType>Quick Add</Styled.TransactionType>
        <Styled.TransactionType>Rip Pack</Styled.TransactionType>
        <Styled.TransactionType>Trade</Styled.TransactionType>
        <Styled.TransactionType>Sale / Purchase</Styled.TransactionType>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
