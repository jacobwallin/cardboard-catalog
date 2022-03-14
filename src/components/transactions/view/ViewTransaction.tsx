import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchTransaction } from "../../../store/collection/transactions/thunks";
import PageContainer from "../../shared/PageContainer";
import DataTable from "react-data-table-component";
import dataFieldsByTransactionType, { dataFields } from "./dataFieldsByType";
import * as Styled from "./styled";
import { transactionTypeMap } from "../main/screateTableData";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import { convertDateString } from "../../../utils/formatTimestamp";

export default function ViewTransaction() {
  const dispatch = useDispatch();
  const { transactionId } = useParams<{ transactionId: string }>();

  const transaction = useSelector(
    (state: RootState) => state.collection.transactions.transaction
  );

  useEffect(() => {
    dispatch(fetchTransaction(+transactionId));
  }, []);

  if (+transactionId !== transaction.id) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <TransactionsHeader title="View Transaction" />
      <PageContainer>
        <Styled.DataContainer>
          <Styled.DataFieldContainer>
            <Styled.DataTitle>Date</Styled.DataTitle>
            <Styled.DataValue>
              {convertDateString(transaction.date)}
            </Styled.DataValue>
          </Styled.DataFieldContainer>
          <Styled.DataFieldContainer>
            <Styled.DataTitle>Type</Styled.DataTitle>
            <Styled.DataValue>
              {transactionTypeMap[transaction.type]}
            </Styled.DataValue>
          </Styled.DataFieldContainer>
          {dataFieldsByTransactionType[transaction.type].PLATFORM.shown && (
            <Styled.DataFieldContainer>
              <Styled.DataTitle>
                {dataFieldsByTransactionType[transaction.type].PLATFORM.title}
              </Styled.DataTitle>
              <Styled.DataValue>
                {transaction.platform === null ? "-" : transaction.platform}
              </Styled.DataValue>
            </Styled.DataFieldContainer>
          )}
          {dataFieldsByTransactionType[transaction.type].INDIVIDUAL.shown && (
            <Styled.DataFieldContainer>
              <Styled.DataTitle>
                {dataFieldsByTransactionType[transaction.type].INDIVIDUAL.title}
              </Styled.DataTitle>
              <Styled.DataValue>
                {transaction.individual === null ? "-" : transaction.individual}
              </Styled.DataValue>
            </Styled.DataFieldContainer>
          )}
          {dataFieldsByTransactionType[transaction.type].MONEY.shown && (
            <Styled.DataFieldContainer>
              <Styled.DataTitle>
                {dataFieldsByTransactionType[transaction.type].MONEY.title}
              </Styled.DataTitle>
              <Styled.DataValue>
                {transaction.money === null ? "-" : transaction.money}
              </Styled.DataValue>
            </Styled.DataFieldContainer>
          )}

          {dataFieldsByTransactionType[transaction.type].NOTE.shown && (
            <Styled.DataFieldContainer>
              <Styled.DataTitle>
                {dataFieldsByTransactionType[transaction.type].NOTE.title}
              </Styled.DataTitle>
              <Styled.DataValue>
                {transaction.note === null ? "-" : transaction.note}
              </Styled.DataValue>
            </Styled.DataFieldContainer>
          )}
        </Styled.DataContainer>
      </PageContainer>
    </>
  );
}
