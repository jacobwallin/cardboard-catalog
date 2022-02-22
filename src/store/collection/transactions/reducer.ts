import * as types from "./types";

const initialState: types.TransactionsState = {
  transaction: {
    id: 0,
    title: "",
    note: "",
    date: "",
    platform: "",
    individual: "",
    money: 0,
    createdAt: "",
    updatedAt: "",
    userId: 0,
    cards: [],
  },
  allTransactions: [],
};

export default function cardReducer(
  state: types.TransactionsState = initialState,
  action: types.TransactionActions
): types.TransactionsState {
  switch (action.type) {
    default:
      return state;
  }
}
