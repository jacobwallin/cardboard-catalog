import { TransactionTypes } from "../../../store/collection/transactions/types";

type TransactionDataFields =
  | "TITLE"
  | "NOTE"
  | "PLATFORM"
  | "INDIVIDUAL"
  | "MONEY"
  | "DATE";

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
  },
};

export default dataFieldsByTransactionType;
