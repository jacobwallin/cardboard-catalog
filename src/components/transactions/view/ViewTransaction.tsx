import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchTransaction } from "../../../store/collection/transactions/thunks";
import PageContainer from "../../shared/PageContainer";
import DataTable from "react-data-table-component";
import dataFieldsByTransactionType from "./dataFieldsByType";

export default function ViewTransaction() {
  const dispatch = useDispatch();
  const { transactionId } = useParams<{ transactionId: string }>();

  const transaction = useSelector(
    (state: RootState) => state.collection.transactions.transaction
  );

  useEffect(() => {
    dispatch(fetchTransaction(+transactionId));
  }, []);

  return <PageContainer>{}</PageContainer>;
}
