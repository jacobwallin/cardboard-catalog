import { SubsetInstance } from "../../../store/library/subsets/types";

export interface AggregatedSubsets {
  base: SubsetInstance[];
  inserts: SubsetInstance[];
  shortPrints: SubsetInstance[];
  autoRelic: SubsetInstance[];
}

export default function aggregateSubsets(
  subsets: SubsetInstance[]
): AggregatedSubsets {
  let aggregatedSubsets: AggregatedSubsets = {
    base: [],
    inserts: [],
    shortPrints: [],
    autoRelic: [],
  };

  subsets.forEach((subset) => {
    if (subset.base) {
      aggregatedSubsets.base.push(subset);
    } else if (subset.shortPrint) {
      aggregatedSubsets.shortPrints.push(subset);
    } else if (subset.auto || subset.relic || subset.manufacturedRelic) {
      aggregatedSubsets.autoRelic.push(subset);
    } else {
      aggregatedSubsets.inserts.push(subset);
    }
  });

  aggregatedSubsets.inserts.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  aggregatedSubsets.shortPrints.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  aggregatedSubsets.autoRelic.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return aggregatedSubsets;
}
