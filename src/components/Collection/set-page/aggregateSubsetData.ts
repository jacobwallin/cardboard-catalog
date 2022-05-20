import aggregateSubsets from "../../Admin/set/aggregateSubsets";
import { SubsetInstance } from "../../../store/library/subsets/types";
import { SubsetCards } from "../../../store/collection/browse/types";

export interface SubsetInstanceUserCard extends SubsetInstance {
  totalCards: number;
  distinctCards: number;
}

export interface AggregatedSubsetData {
  base: SubsetInstanceUserCard[];
  inserts: SubsetInstanceUserCard[];
  shortPrints: SubsetInstanceUserCard[];
  autoRelic: SubsetInstanceUserCard[];
}

export default function aggregateSubsetData(
  subsets: SubsetInstance[],
  cardsBySubset: SubsetCards[],
  collectionOnly: boolean
): AggregatedSubsetData {
  let aggregatedSubsets = aggregateSubsets(subsets);

  let base: SubsetInstanceUserCard[] = aggregatedSubsets.base
    .map((baseSubset) => {
      const subsetUserCard = cardsBySubset.find(
        (subset) => subset.subsetId === baseSubset.id
      );
      return {
        ...baseSubset,
        totalCards: subsetUserCard ? +subsetUserCard.totalCards : 0,
        distinctCards: subsetUserCard ? +subsetUserCard.distinctCards : 0,
      };
    })
    .filter((s) => s.totalCards > 0 || !collectionOnly);

  let inserts: SubsetInstanceUserCard[] = aggregatedSubsets.inserts
    .map((insertSubset) => {
      const subsetUserCard = cardsBySubset.find(
        (subset) => subset.subsetId === insertSubset.id
      );
      return {
        ...insertSubset,
        totalCards: subsetUserCard ? +subsetUserCard.totalCards : 0,
        distinctCards: subsetUserCard ? +subsetUserCard.distinctCards : 0,
      };
    })
    .filter((s) => s.totalCards > 0 || !collectionOnly);

  let shortPrints: SubsetInstanceUserCard[] = aggregatedSubsets.shortPrints
    .map((shortPrintSubset) => {
      const subsetUserCard = cardsBySubset.find(
        (subset) => subset.subsetId === shortPrintSubset.id
      );
      return {
        ...shortPrintSubset,
        totalCards: subsetUserCard ? +subsetUserCard.totalCards : 0,
        distinctCards: subsetUserCard ? +subsetUserCard.distinctCards : 0,
      };
    })
    .filter((s) => s.totalCards > 0 || !collectionOnly);

  let autoRelic: SubsetInstanceUserCard[] = aggregatedSubsets.autoRelic
    .map((autoRelicSubset) => {
      const subsetUserCard = cardsBySubset.find(
        (subset) => subset.subsetId === autoRelicSubset.id
      );
      return {
        ...autoRelicSubset,
        totalCards: subsetUserCard ? +subsetUserCard.totalCards : 0,
        distinctCards: subsetUserCard ? +subsetUserCard.distinctCards : 0,
      };
    })
    .filter((s) => s.totalCards > 0 || !collectionOnly);

  return {
    base,
    inserts,
    shortPrints,
    autoRelic,
  };
}
