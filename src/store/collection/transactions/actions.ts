import * as types from "./types";

export const getTransactionRequest = (): types.TransactionActions => ({
  type: types.GET_TRANSACTION_REQUEST,
});
export const getTransactionSuccess = (
  transaction: types.SingleTransaction
): types.TransactionActions => ({
  type: types.GET_TRANSACTION_SUCCESS,
  transaction,
});
export const getTransactionFailure = (): types.TransactionActions => ({
  type: types.GET_TRANSACTION_FAILURE,
});

export const getAllTransactionsRequest = (): types.TransactionActions => ({
  type: types.GET_ALL_TRANSACTIONS_REQUEST,
});
export const getAllTransactionsSuccess = (
  allTransactions: types.TransactionSummary[]
): types.TransactionActions => ({
  type: types.GET_ALL_TRANSACTIONS_SUCCESS,
  allTransactions,
});
export const getAllTransactionsFailure = (): types.TransactionActions => ({
  type: types.GET_ALL_TRANSACTIONS_FAILURE,
});

export const addTransactionRequest = (): types.TransactionActions => ({
  type: types.ADD_TRANSACTION_REQUEST,
});
export const addTransactionSuccess = (
  newTransaction: types.SingleTransaction
): types.TransactionActions => ({
  type: types.ADD_TRANSACTION_SUCCESS,
  newTransaction,
});
export const addTransactionFailure = (): types.TransactionActions => ({
  type: types.ADD_TRANSACTION_FAILURE,
});
