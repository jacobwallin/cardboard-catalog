import * as types from "./types";

const initialState: types.TransactionsState = {
  transaction: {
    id: 0,
    type: "ADD",
    title: "",
    note: "",
    date: "",
    platform: "",
    individual: "",
    money: 0,
    createdAt: "",
    updatedAt: "",
    userId: 0,
    setId: 0,
    pending: false,
    user_cards: [],
  },
  allTransactions: [],
  pendingTransactions: [],
};

export default function cardReducer(
  state: types.TransactionsState = initialState,
  action: types.TransactionActions
): types.TransactionsState {
  switch (action.type) {
    case types.GET_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        allTransactions: action.allTransactions,
      };
    case types.GET_PENDING_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        pendingTransactions: action.pendingTransactions,
      };
    case types.GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.transaction,
      };
    case types.ADD_TRANSACTION_SUCCESS:
      // get just the transaction_user_card objects to create a TransactionSummary object
      const transaction_user_cards = action.newTransaction.user_cards.map(
        (user_card) => {
          return user_card.transaction_user_card;
        }
      );
      const newTransaction = {
        ...action.newTransaction,
        transaction_user_cards: transaction_user_cards,
      };
      if (action.newTransaction.pending) {
        return {
          ...state,
          pendingTransactions: [...state.pendingTransactions, newTransaction],
        };
      }
      // first filter transactions to remove a duplicate add or delete transaction
      return {
        ...state,
        allTransactions: [
          ...state.allTransactions.filter(
            (transaction) => transaction.id !== newTransaction.id
          ),
          newTransaction,
        ],
      };
    case types.UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.transaction,
      };
    case types.DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        allTransactions: state.allTransactions.filter(
          (t) => t.id !== action.transactionId
        ),
      };
    default:
      return state;
  }
}
