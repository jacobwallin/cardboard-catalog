import { TransactionTypes } from "../../../store/collection/transactions/types";

type TransactionDataFields =
  | "TITLE"
  | "NOTE"
  | "PLATFORM"
  | "INDIVIDUAL"
  | "MONEY";

const dataFields: {
  [type: string]: TransactionDataFields;
} = {
  TITLE: "TITLE",
  NOTE: "NOTE",
  PLATFORM: "PLATFORM",
  INDIVIDUAL: "INDIVIDUAL",
  MONEY: "MONEY",
};

const dataFieldsByTransactionType: {
  [K in TransactionTypes]: TransactionDataFields[];
} = {
  ADD: [],
  DELETE: [],
  TRADE: [dataFields.NOTE, dataFields.INDIVIDUAL, dataFields.MONEY],
  SALE: [
    dataFields.NOTE,
    dataFields.INDIVIDUAL,
    dataFields.PLATFORM,
    dataFields.MONEY,
  ],
  PURCHASE: [
    dataFields.NOTE,
    dataFields.INDIVIDUAL,
    dataFields.PLATFORM,
    dataFields.MONEY,
  ],
  RIP: [dataFields.NOTE],
};

export default dataFieldsByTransactionType;
