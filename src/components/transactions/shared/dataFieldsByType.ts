import { TransactionTypes } from "../../../store/collection/transactions/types";

type TransactionDataFields =
  | "DATE"
  | "TITLE"
  | "NOTE"
  | "PLATFORM"
  | "INDIVIDUAL"
  | "MONEY"
  | "PENDING";

export const dataFields: {
  [type: string]: TransactionDataFields;
} = {
  DATE: "DATE",
  TITLE: "TITLE",
  NOTE: "NOTE",
  PLATFORM: "PLATFORM",
  INDIVIDUAL: "INDIVIDUAL",
  MONEY: "MONEY",
};

const dataFieldsByTransactionType: {
  [K in TransactionTypes]: {
    [K in TransactionDataFields]: {
      shown: boolean;
      title: string;
    };
  };
} = {
  ADD: {
    DATE: {
      shown: false,
      title: "",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: false,
      title: "",
    },
    PLATFORM: {
      shown: false,
      title: "",
    },
    INDIVIDUAL: {
      shown: false,
      title: "",
    },
    MONEY: {
      shown: false,
      title: "",
    },
    PENDING: {
      shown: false,
      title: "",
    },
  },
  DELETE: {
    DATE: {
      shown: false,
      title: "",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: false,
      title: "",
    },
    PLATFORM: {
      shown: false,
      title: "",
    },
    INDIVIDUAL: {
      shown: false,
      title: "",
    },
    MONEY: {
      shown: false,
      title: "",
    },
    PENDING: {
      shown: false,
      title: "",
    },
  },
  RIP: {
    DATE: {
      shown: true,
      title: "Date",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: false,
      title: "",
    },
    PLATFORM: {
      shown: false,
      title: "",
    },
    INDIVIDUAL: {
      shown: false,
      title: "",
    },
    MONEY: {
      shown: false,
      title: "",
    },
    PENDING: {
      shown: true,
      title: "Pending",
    },
  },
  TRADE: {
    DATE: {
      shown: true,
      title: "Date",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: true,
      title: "Note",
    },
    PLATFORM: {
      shown: false,
      title: "",
    },
    INDIVIDUAL: {
      shown: true,
      title: "Traded with",
    },
    MONEY: {
      shown: true,
      title: "$",
    },
    PENDING: {
      shown: true,
      title: "Pending",
    },
  },
  SALE: {
    DATE: {
      shown: true,
      title: "Date",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: true,
      title: "Note",
    },
    PLATFORM: {
      shown: true,
      title: "Sold Through",
    },
    INDIVIDUAL: {
      shown: true,
      title: "Sold To",
    },
    MONEY: {
      shown: true,
      title: "$ Received",
    },
    PENDING: {
      shown: false,
      title: "",
    },
  },
  PURCHASE: {
    DATE: {
      shown: true,
      title: "Date",
    },
    TITLE: {
      shown: false,
      title: "",
    },
    NOTE: {
      shown: true,
      title: "Note",
    },
    PLATFORM: {
      shown: true,
      title: "Purchased Through",
    },
    INDIVIDUAL: {
      shown: true,
      title: "Purchased From",
    },
    MONEY: {
      shown: true,
      title: "$ Spent",
    },
    PENDING: {
      shown: true,
      title: "Pending",
    },
  },
};

export default dataFieldsByTransactionType;
