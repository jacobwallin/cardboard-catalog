import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTransaction } from "../../../store/collection/transactions/thunks";

export default function ViewTransaction() {
  const dispatch = useDispatch();
  const { transactionId } = useParams<{ transactionId: string }>();

  useEffect(() => {
    dispatch(fetchTransaction(+transactionId));
  }, []);

  return <div>ur viewing a transaction</div>;
}
