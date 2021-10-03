export interface Filters {
  year: {
    filter: boolean;
    value: number;
  };
  setId: {
    filter: boolean;
    value: number;
  };
  subsetId: {
    filter: boolean;
    value: number;
  };
  seriesId: {
    filter: boolean;
    value: number;
  };
  teamId: {
    filter: boolean;
    value: number;
  };
  playerId: {
    filter: boolean;
    value: number;
  };
  serialized: {
    filter: boolean;
    value: boolean;
  };
  rookie: {
    filter: boolean;
    value: boolean;
  };
  auto: {
    filter: boolean;
    value: boolean;
  };
  relic: {
    filter: boolean;
    value: boolean;
  };
  manufacturedRelic: {
    filter: boolean;
    value: boolean;
  };
  parallel: {
    filter: boolean;
    value: boolean;
  };
  shortPrint: {
    filter: boolean;
    value: boolean;
  };
}

export const initialFilters = {
  year: {
    filter: false,
    value: 0,
  },
  setId: {
    filter: false,
    value: 0,
  },
  subsetId: {
    filter: false,
    value: 0,
  },
  seriesId: {
    filter: false,
    value: 0,
  },
  teamId: {
    filter: false,
    value: 0,
  },
  playerId: {
    filter: false,
    value: 0,
  },
  serialized: {
    filter: false,
    value: false,
  },
  rookie: {
    filter: false,
    value: false,
  },
  auto: {
    filter: false,
    value: false,
  },
  relic: {
    filter: false,
    value: false,
  },
  manufacturedRelic: {
    filter: false,
    value: false,
  },
  parallel: {
    filter: false,
    value: false,
  },
  shortPrint: {
    filter: false,
    value: false,
  },
};
