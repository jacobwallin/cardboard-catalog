import { UserCard } from "../filter/types";

// ACTION TYPES
export const GET_TRANSACTION_REQUEST = "GET_TRANSACTION_REQUEST";
export const GET_TRANSACTION_SUCCESS = "GET_TRANSACTION_SUCCESS";
export const GET_TRANSACTION_FAILURE = "GET_TRANSACTION_FAILURE";
export const GET_ALL_TRANSACTIONS_REQUEST = "GET_ALL_TRANSACTIONS_REQUEST";
export const GET_ALL_TRANSACTIONS_SUCCESS = "GET_ALL_TRANSACTIONS_SUCCESS";
export const GET_ALL_TRANSACTIONS_FAILURE = "GET_ALL_TRANSACTIONS_FAILURE";
export const ADD_TRANSACTION_REQUEST = "ADD_TRANSACTION_REQUEST";
export const ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS";
export const ADD_TRANSACTION_FAILURE = "ADD_TRANSACTION_FAILURE";

// ACTIONS
interface GetTransactionRequest {
  type: typeof GET_TRANSACTION_REQUEST;
}
interface GetTransactionSuccess {
  type: typeof GET_TRANSACTION_SUCCESS;
  transaction: SingleTransaction;
}
interface GetTransactionFailure {
  type: typeof GET_TRANSACTION_FAILURE;
}

interface GetAllTransactionsRequest {
  type: typeof GET_ALL_TRANSACTIONS_REQUEST;
}
interface GetAllTransactionsSuccess {
  type: typeof GET_ALL_TRANSACTIONS_SUCCESS;
  allTransactions: TransactionSummary[];
}
interface GetAllTransactionsFailure {
  type: typeof GET_ALL_TRANSACTIONS_FAILURE;
}

interface AddTransactionRequest {
  type: typeof ADD_TRANSACTION_REQUEST;
}
interface AddTransactionSuccess {
  type: typeof ADD_TRANSACTION_SUCCESS;
  newTransaction: SingleTransaction;
}
interface AddTransactionFailure {
  type: typeof ADD_TRANSACTION_FAILURE;
}

export type TransactionActions =
  | GetTransactionRequest
  | GetTransactionSuccess
  | GetTransactionFailure
  | GetAllTransactionsRequest
  | GetAllTransactionsSuccess
  | GetAllTransactionsFailure
  | AddTransactionRequest
  | AddTransactionSuccess
  | AddTransactionFailure;

// STATE
export interface TransactionsState {
  transaction: SingleTransaction;
  allTransactions: TransactionSummary[];
}

export interface SingleTransaction {
  id: number;
  title: string | null;
  note: string | null;
  date: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  cards: UserCard[];
}

export interface TransactionSummary {
  id: number;
  title: string;
  note: string;
  date: string;
  platform: string;
  individual: string;
  money: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
