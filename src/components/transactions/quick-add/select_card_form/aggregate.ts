import createTableData, {
  SeriesTableData,
} from "../../../Collection/subset_page/createTableData";
import { SetSummary, Set } from "../../../../store/library/sets/types";
import { SubsetState } from "../../../../store/library/subsets/types";
import { UserCard } from "../../../../store/collection/browse/types";
import sortSeries from "../../../Collection/subset_page/sortSeries";

// these functions aggregate the API data for each of the select drop down menus
export function aggregateYears(allSets: SetSummary[]): number[] {
  let yearsArray: number[] = [];
  allSets.forEach((set) => {
    if (
      yearsArray.length === 0 ||
      yearsArray[yearsArray.length - 1] !== set.year
    ) {
      yearsArray.push(set.year);
    }
  });
  return yearsArray;
}

export function aggregateSets(
  allSets: SetSummary[],
  year: number
): SetSummary[] {
  return allSets
    .filter((set) => {
      return set.year === year;
    })
    .sort((setA, setB) => {
      if (setA.name < setB.name) return -1;
      if (setA.name > setB.name) return 1;
      return 0;
    });
}

export interface SubsetData {
  id: number;
  name: string;
  prefix: string;
}
export function aggregateSubsets(set: Set): SubsetData[] {
  return set.subsets
    .sort((subsetA, subsetB) => {
      if (subsetA.id === set.baseSubsetId) return -1;
      if (subsetB.id === set.baseSubsetId) return 1;

      if (subsetA.name < subsetB.name) return -1;
      if (subsetA.name > subsetB.name) return 1;
      return 0;
    })
    .map((subset) => {
      return {
        id: subset.id,
        name: subset.name,
        prefix: subset.prefix,
      };
    });
}

export function aggregateSubset(
  librarySubsetData: SubsetState,
  userCardData: { cards: UserCard[]; subsetId: number }
): SeriesTableData[] {
  const tableData = createTableData(librarySubsetData, userCardData);
  return Object.keys(tableData)
    .map((seriesId) => tableData[+seriesId])
    .sort((seriesA, seriesB) => {
      return sortSeries(
        seriesA.series,
        seriesB.series,
        librarySubsetData.baseSeriesId || 0
      );
    });
}
