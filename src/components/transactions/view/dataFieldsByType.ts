import { TransactionTypes } from "../../../store/collection/transactions/types";

type TransactionData = "TITLE" | "NOTE" | "PLATFORM" | "INDIVIDUAL" | "MONEY";

interface DataFields {
  [type: string]: TransactionData;
}

const dataFields: DataFields = {
  TITLE: "TITLE",
  NOTE: "NOTE",
  PLATFORM: "PLATFORM",
  INDIVIDUAL: "INDIVIDUAL",
  MONEY: "MONEY",
};

type DataFieldsByTransactionType = {
  [K in TransactionTypes]: TransactionData[];
};

const dataFieldsByTransactionType: DataFieldsByTransactionType = {
  QUICK: [],
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
