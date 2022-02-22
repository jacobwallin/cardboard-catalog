import React from "react";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import TransactionsHeader from "../Collection/header/TransactionsHeader";
import * as Styled from "./styled";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <TransactionsHeader title="Transactions" />
        <Styled.Header>Create New Transaction</Styled.Header>
        <Styled.TransactionsContainer>
          <Styled.TransactionType>Quick Add</Styled.TransactionType>
          <Styled.TransactionType>Rip Pack</Styled.TransactionType>
          <Styled.TransactionType>Trade</Styled.TransactionType>
          <Styled.TransactionType>Sale / Purchase</Styled.TransactionType>
        </Styled.TransactionsContainer>
        <Styled.Header>Transaction History</Styled.Header>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
