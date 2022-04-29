import createTableData, {
  SeriesTableData,
} from "../../../Collection/subset-page/createTableData";
import { SetSummary, Set } from "../../../../store/library/sets/types";
import { Subset } from "../../../../store/library/subsets/types";
import { UserCard } from "../../../../store/collection/browse/types";
import {
  SetCards,
  SubsetCards,
} from "../../../../store/collection/browse/types";
import sortSeries from "../../../Collection/subset-page/sortSeries";

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
  librarySubsetData: Subset,
  userCardData: { cards: UserCard[]; subsetId: number },
  subsetsWithUserCardsOnly: boolean
): SeriesTableData[] {
  const tableData = createTableData(librarySubsetData, userCardData);
  // convert table data to an array and filter and sort out series
  return Object.keys(tableData)
    .map((seriesId) => tableData[+seriesId])
    .filter((series) => {
      if (subsetsWithUserCardsOnly) {
        return series.userCards.length > 0;
      }
      return true;
    })
    .sort((seriesA, seriesB) => {
      return sortSeries(
        seriesA.series,
        seriesB.series,
        librarySubsetData.baseSeriesId || 0
      );
    });
}

export function collectionYears(collectionSets: SetCards[]): number[] {
  let distinctYears = collectionSets.reduce(
    (years: { [key: number]: boolean }, set) => {
      if (!years[set.year]) {
        years[set.year] = true;
      }
      return years;
    },
    {}
  );

  const years: number[] = Object.keys(distinctYears)
    .map((yearString) => +yearString)
    .sort((yearA, yearB) => {
      return yearB - yearA;
    });

  return years;
}

export function collectionSetsInYear(
  collectionSets: SetCards[],
  year: number
): SetSummary[] {
  // must return SetSummary to give selectcardform the same data format, unnecessary information is given dummy values
  return collectionSets
    .filter((set) => set.year === year)
    .map((set) => {
      return {
        id: set.setId,
        name: set.setName,
        release_date: set.release_date,
        year: set.year,
        complete: false,
        description: set.setDescription,
        createdAt: "",
        updatedAt: "",
        createdBy: 0,
        updatedBy: 0,
        baseSubsetId: 0,
        leagueId: 0,
        brandId: 0,
        league: {
          name: "",
          id: 0,
        },
        brand: {
          name: "",
          id: 0,
        },
      };
    });
}

export function collectionSubsets(userSubsets: SubsetCards[]): SubsetData[] {
  return userSubsets
    .map((subset) => {
      return {
        id: subset.subsetId,
        name: subset.subsetName,
        prefix: subset.prefix,
      };
    })
    .sort((subsetA, subsetB) => {
      if (subsetA.name < subsetB.name) return -1;
      if (subsetA.name > subsetB.name) return 1;
      return 0;
    });
}

export function createFormData() {}
