import React from "react";
import { TransactionSummary } from "../../../store/collection/transactions/types";
import StyledLink from "../../Collection/shared/StyledLink";

import formatTimestamp from "../../../utils/formatTimestamp";

export interface TransactionTableData {
  id: number;
  type: string;
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
  cardsAdded: number;
  cardsRemoved: number;
}

// display names for each transaction types
export const transactionTypeMap = {
  ADD: "Add",
  DELETE: "Remove",
  TRADE: "Trade",
  SALE: "Sale",
  PURCHASE: "Purchase",
  RIP: "Rip",
};

export default function createTableData(
  transactions: TransactionSummary[]
): TransactionTableData[] {
  return transactions.map((transaction) => {
    const { transaction_user_cards, ...rest } = transaction;
    const tableRow: TransactionTableData = {
      ...rest,
      type: transactionTypeMap[rest.type],
      createdAt: formatTimestamp(rest.createdAt),
      cardsAdded: 0,
      cardsRemoved: 0,
    };
    tableRow.cardsAdded = transaction_user_cards.filter(
      (instance) => !instance.deleted
    ).length;
    tableRow.cardsRemoved = transaction_user_cards.filter(
      (instance) => instance.deleted
    ).length;

    return tableRow;
  });
}

export const columns = [
  {
    name: "Date",
    selector: "date",
    sortable: true,
    // minWidth: "50px",
    // grow: 2,
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
    // minWidth: "75px",
    // maxWidth: "75px",
    // style: tableStyles,
    // grow: 0,
  },
  {
    name: "Cards Added",
    selector: "cardsAdded",
    sortable: true,
    // minWidth: "75px",
    // maxWidth: "75px",
    // style: tableStyles,
    // grow: 0,
  },
  {
    name: "Cards Removed",
    selector: "cardsRemoved",
    sortable: true,
    // minWidth: "75px",
    // maxWidth: "75px",
    // style: tableStyles,
    // grow: 0,
  },
  {
    name: "Created On",
    selector: "createdAt",
    sortable: true,
    // minWidth: "50px",
    // grow: 2,
  },
  {
    name: "",
    sortable: false,
    cell: (row: TransactionTableData) => (
      <StyledLink to={`/transactions/${row.id}`}>View</StyledLink>
    ),
    maxWidth: "80px",
    minWidth: "80px",
  },
];
