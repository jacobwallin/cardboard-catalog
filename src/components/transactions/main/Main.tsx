import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  fetchAllTransactions,
  fetchPendingTransactions,
} from "../../../store/collection/transactions/thunks";
import PageContainer from "../../shared/PageContainer";
import PageHeader from "../../shared/PageHeader";
import * as Styled from "../styled";
import createTableData, {
  TransactionTableData,
  columns,
} from "./screateTableData";
import DataTable from "react-data-table-component";

export default function Main() {
  const dispatch = useDispatch();

  const allTransactions = useSelector(
    (state: RootState) => state.collection.transactions.allTransactions
  );
  const pendingTransactions = useSelector(
    (state: RootState) => state.collection.transactions.pendingTransactions
  );
  const [allTransactionsTableData, setAllTransactionsTableData] = useState<
    TransactionTableData[]
  >([]);
  const [pendingTransactionsTableData, setPendingTransactionsTableData] =
    useState<TransactionTableData[]>([]);

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchPendingTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (allTransactions.length > 0) {
      setAllTransactionsTableData(createTableData(allTransactions));
    }
    if (pendingTransactions.length > 0) {
      setPendingTransactionsTableData(createTableData(pendingTransactions));
    }
  }, [allTransactions, pendingTransactions]);

  return (
    <>
      <PageHeader title="Transactions" />
      <PageContainer>
        <Styled.Header>Create New Transaction</Styled.Header>
        <Styled.TransactionsContainer>
          <Styled.TransactionLink to="/transactions/add">
            Add Cards
          </Styled.TransactionLink>
          <Styled.TransactionLink to="/transactions/remove">
            Remove Cards
          </Styled.TransactionLink>
          <Styled.TransactionLink to="/transactions/trade">
            Trade
          </Styled.TransactionLink>
          <Styled.TransactionLink to="/transactions/sale">
            Sale
          </Styled.TransactionLink>
          <Styled.TransactionLink to="/transactions/purchase">
            Purchase
          </Styled.TransactionLink>
        </Styled.TransactionsContainer>
        {pendingTransactions.length > 0 && (
          <Styled.TableWrapper>
            <Styled.Header>Pending Transactions</Styled.Header>
            <DataTable
              noHeader
              dense
              columns={columns}
              data={pendingTransactionsTableData}
              highlightOnHover
              pagination={pendingTransactions.length > 5}
              paginationRowsPerPageOptions={[5, 10, 20]}
              paginationPerPage={5}
            />
          </Styled.TableWrapper>
        )}
        <Styled.TableWrapper>
          <Styled.Header>Transaction Log</Styled.Header>
          <DataTable
            noHeader
            dense
            columns={columns}
            data={allTransactionsTableData}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20]}
            paginationPerPage={20}
          />
        </Styled.TableWrapper>
      </PageContainer>
    </>
  );
}
