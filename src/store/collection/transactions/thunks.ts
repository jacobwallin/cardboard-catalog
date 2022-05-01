import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { addCards, deleteCards } from "../browse/actions";
import { CollectionActionTypes } from "../browse/types";
import {
  TransactionActions,
  TransactionPostData,
  TransactionPutData,
  TransactionSummary,
  AddTransactionResponse,
} from "./types";
import { get, post, put } from "../../../utils/fetch";

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

export const fetchPendingTransactions =
  (): ThunkAction<void, RootState, unknown, TransactionActions> =>
  (dispatch) => {
    dispatch(actions.getPendingTransactionsRequest());
    get(`/api/transactions?status=pending`, dispatch)
      .then((payload: TransactionSummary[]) => {
        dispatch(actions.getPendingTransactionsSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getPendingTransactionsFailure());
      });
  };

export const addTransaction =
  (
    data: TransactionPostData,
    createdFromSubsetPage: boolean
  ): ThunkAction<
    void,
    RootState,
    unknown,
    TransactionActions | CollectionActionTypes
  > =>
  (dispatch) => {
    dispatch(actions.addTransactionRequest());
    post(`/api/transactions`, { ...data }, dispatch)
      .then((payload: AddTransactionResponse) => {
        dispatch(actions.addTransactionSuccess(payload));
        if (data.type === "ADD" && createdFromSubsetPage) {
          dispatch(
            addCards(
              payload.user_cards
                .filter((userCard) => !userCard.transaction_user_card.deleted)
                .map((userCard) => {
                  const { transaction_user_card, ...newUserCard } = userCard;
                  return newUserCard;
                })
            )
          );
        } else if (data.type === "DELETE" && createdFromSubsetPage) {
          dispatch(
            deleteCards(
              payload.user_cards
                .filter((userCard) => userCard.transaction_user_card.deleted)
                .map((userCard) => userCard.id)
            )
          );
        }
      })
      .catch((err) => {
        dispatch(actions.addTransactionFailure());
      });
  };

export const updateTransaction =
  (
    data: TransactionPutData,
    transactionId: number
  ): ThunkAction<void, RootState, unknown, TransactionActions> =>
  (dispatch) => {
    dispatch(actions.updateTransactionRequest());
    put(`/api/transactions/${transactionId}`, { ...data }, dispatch)
      .then((payload) => {
        dispatch(actions.updateTransactionSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.updateTransactionFailure());
      });
  };
