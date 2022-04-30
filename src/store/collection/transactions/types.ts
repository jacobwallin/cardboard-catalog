import { UserCard } from "../filter/types";
import { CardData } from "../browse/types";

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
export const UPDATE_TRANSACTION_REQUEST = "UPDATE_TRANSACTION_REQUEST";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_FAILURE = "UPDATE_TRANSACTION_FAILURE";

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
export interface AddTransactionSuccess {
  type: typeof ADD_TRANSACTION_SUCCESS;
  newTransaction: AddTransactionResponse;
}
interface AddTransactionFailure {
  type: typeof ADD_TRANSACTION_FAILURE;
}

interface UpdateTransactionRequest {
  type: typeof UPDATE_TRANSACTION_REQUEST;
}
interface UpdateTransactionSuccess {
  type: typeof UPDATE_TRANSACTION_SUCCESS;
  transaction: SingleTransaction;
}
interface UpdateTransactionFailure {
  type: typeof UPDATE_TRANSACTION_FAILURE;
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
  | AddTransactionFailure
  | UpdateTransactionRequest
  | UpdateTransactionSuccess
  | UpdateTransactionFailure;

// STATE
export interface TransactionsState {
  transaction: SingleTransaction;
  allTransactions: TransactionSummary[];
}

export type TransactionTypes =
  | "ADD"
  | "DELETE"
  | "TRADE"
  | "SALE"
  | "PURCHASE"
  | "RIP";

export interface SingleTransaction {
  id: number;
  type: TransactionTypes;
  date: string;
  title: string | null;
  note: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  setId: number | null;
  pending: boolean;
  user_cards: UserCardWithTransaction[];
}

export interface UserCardWithTransaction extends UserCard {
  transaction_user_card: {
    id: number;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    transactionId: number;
    userCardId: number;
  };
}

export interface TransactionSummary {
  id: number;
  type: TransactionTypes;
  date: string;
  title: string | null;
  note: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  setId: number | null;
  pending: boolean;
  transaction_user_cards: TransactionUserCard[];
}

interface TransactionUserCard {
  id: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  transactionId: number;
  userCardId: number;
}

// data needed to post new transaction
export interface TransactionPostData {
  type: TransactionTypes;
  date: string;
  cardsAdded?: CardData[];
  userCardsRemoved?: number[];
  money?: number | null;
  platform?: string | null;
  individual?: string | null;
  setId?: number;
  title?: string | null;
  notes?: string | null;
}

export interface TransactionPutData {
  date: string;
  cardsAdded?: CardData[];
  userCardsRemoved?: number[];
  money?: number | null;
  platform?: string | null;
  individual?: string | null;
  title?: string | null;
  notes?: string | null;
  addedCardsRemoved?: number[];
  removedCardsAdded?: number[];
}

export interface AddTransactionResponse {
  id: number;
  type: TransactionTypes;
  date: string;
  title: string | null;
  note: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  setId: number | null;
  pending: boolean;
  user_cards: NewTransactionUserCard[];
}

interface NewTransactionUserCard {
  id: number;
  serialNumber: number | null;
  grade: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  cardId: number;
  gradingCompanyId: number | null;
  card: {
    id: number;
    value: number | null;
    serializedTo: number | null;
    seriesId: number;
    cardDataId: number;
  };
  transaction_user_card: {
    id: number;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    transactionId: number;
    userCardId: number;
  };
}
