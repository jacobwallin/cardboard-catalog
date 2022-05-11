import aggregateSubsets from "../../Admin/set/aggregateSubsets";
import { SubsetInstance } from "../../../store/library/subsets/types";
import { SubsetCards } from "../../../store/collection/browse/types";

export interface SubsetInstanceUserCard extends SubsetInstance {
  totalCards: number;
  distinctCards: number;
}

export interface AggregatedSubsetData {
  base: SubsetInstanceUserCard | undefined;
  inserts: SubsetInstanceUserCard[];
  shortPrints: SubsetInstanceUserCard[];
  autoRelic: SubsetInstanceUserCard[];
}

export default function aggregateSubsetData(
  subsets: SubsetInstance[],
  cardsBySubset: SubsetCards[],
  baseSubsetId: number,
  collectionOnly: boolean
): AggregatedSubsetData {
  let aggregatedSubsets = aggregateSubsets(subsets, baseSubsetId);
  let base: SubsetInstanceUserCard | undefined = undefined;
  if (aggregatedSubsets.base) {
    const baseSubsetUserCard = cardsBySubset.find(
      (subset) => subset.subsetId === baseSubsetId
    );
    if (baseSubsetUserCard) {
      base = {
        ...aggregatedSubsets.base,
        totalCards: +baseSubsetUserCard.totalCards,
        distinctCards: +baseSubsetUserCard.distinctCards,
      };
    } else if (!collectionOnly) {
      base = {
        ...aggregatedSubsets.base,
        totalCards: 0,
        distinctCards: 0,
      };
    }
  }

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
