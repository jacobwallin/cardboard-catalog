import { TransactionTypes } from "../../../store/collection/transactions/types";

type TransactionDataFields =
  | "TITLE"
  | "NOTE"
  | "PLATFORM"
  | "INDIVIDUAL"
  | "MONEY";

export const dataFields: {
  [type: string]: TransactionDataFields;
} = {
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
