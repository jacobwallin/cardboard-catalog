import * as types from "./types";

const initialState: types.TransactionsState = {
  transaction: {
    id: 0,
    type: "QUICK",
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
    cards: [],
  },
  allTransactions: [],
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
    case types.GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.transaction,
      };
    default:
      return state;
  }
}
