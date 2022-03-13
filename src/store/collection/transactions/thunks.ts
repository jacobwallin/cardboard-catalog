import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { addCards, deleteCards } from "../browse/actions";
import { CollectionActionTypes } from "../browse/types";
import {
  TransactionActions,
  TransactionPostData,
  TransactionSummary,
  AddTransactionResponse,
} from "./types";
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
          console.log(
            "ADDING CARDS",
            payload.user_cards
              .filter((userCard) => !userCard.transaction_user_card.deleted)
              .map((userCard) => {
                const { transaction_user_card, ...newUserCard } = userCard;
                return newUserCard;
              })
          );
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
