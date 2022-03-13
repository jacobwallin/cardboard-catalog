import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import {
  TransactionActions,
  TransactionPostData,
  TransactionSummary,
} from "./types";
import { UserCard } from "../browse/types";
import { get, post } from "../../../utils/fetch";

export const fetchTransaction =
  (
    transactionId: number
  ): ThunkAction<void, RootState, unknown, TransactionActions> =>
  (dispatch) => {
    dispatch(actions.getTransactionRequest());
    get(`/api/transactions/${transactionId}`, dispatch)
      .then((payload) => {
        dispatch(actions.getTransactionSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getTransactionFailure());
      });
  };

export const fetchAllTransactions =
  (): ThunkAction<void, RootState, unknown, TransactionActions> =>
  (dispatch) => {
    dispatch(actions.getAllTransactionsRequest());
    get(`/api/transactions/`, dispatch)
      .then((payload: TransactionSummary[]) => {
        dispatch(actions.getAllTransactionsSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getAllTransactionsFailure());
      });
  };

export const addTransaction =
  (
    data: TransactionPostData,
    cardsAdded?: UserCard,
    userCardsRemoved?: number[]
  ): ThunkAction<void, RootState, unknown, TransactionActions> =>
  (dispatch) => {
    dispatch(actions.addTransactionRequest());
    post(`/api/transactions`, { ...data }, dispatch)
      .then((payload) => {
        dispatch(actions.addTransactionSuccess(payload));
        // if cards added or deleted argument was sent, dispatch action to adjust subset data
      })
      .catch((err) => {
        dispatch(actions.addTransactionFailure());
      });
  };
