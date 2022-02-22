import React from "react";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import TransactionsHeader from "../Collection/header/TransactionsHeader";
import * as Styled from "./styled";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <TransactionsHeader title="Create Transaction" />
        <Styled.Header>Select Transaction Type</Styled.Header>
        <Styled.TransactionsContainer>
          <Styled.TransactionLink to="/transactions/add">
            Quick Add
          </Styled.TransactionLink>
          {/* <Styled.TransactionLink>Rip Pack</Styled.TransactionLink>
          <Styled.TransactionLink>Trade</Styled.TransactionLink>
          <Styled.TransactionLink>Sale / Purchase</Styled.TransactionLink> */}
        </Styled.TransactionsContainer>
        <Styled.Header>Transaction History</Styled.Header>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
