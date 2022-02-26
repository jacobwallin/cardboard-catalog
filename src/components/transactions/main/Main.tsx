import React from "react";
import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import * as Styled from "../styled";

export default function Main() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <TransactionsHeader title="Create Transaction" />
        <Styled.Header>Select Transaction Type</Styled.Header>
        <Styled.TransactionsContainer>
          <Styled.TransactionLink to="/transactions/add">
            Quick Add
          </Styled.TransactionLink>
          <Styled.TransactionLink to="/transactions/trade">
            Trade
          </Styled.TransactionLink>
        </Styled.TransactionsContainer>
        <Styled.Header>Transaction History</Styled.Header>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
