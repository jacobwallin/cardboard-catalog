import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllTransactions } from "../../../store/collection/transactions/thunks";
import PageContainer from "../../shared/PageContainer";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import * as Styled from "../styled";
import createTableData, {
  TransactionTableData,
  columns,
} from "./createTableData";
import DataTable from "react-data-table-component";

export default function Main() {
  const dispatch = useDispatch();

  const allTransactions = useSelector(
    (state: RootState) => state.collection.transactions.allTransactions
  );
  const [tableData, setTableData] = useState<TransactionTableData[]>([]);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) {
      console.log("CREATED TABLE DATA");
      setTableData(createTableData(allTransactions));
    }
  }, [allTransactions]);

  return (
    <>
      <TransactionsHeader title="Create Transaction" />
      <PageContainer>
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
        <DataTable
          noHeader
          dense
          columns={columns}
          data={tableData}
          highlightOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20]}
          paginationPerPage={20}
        />
      </PageContainer>
    </>
  );
}
