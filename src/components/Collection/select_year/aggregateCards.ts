import { SetCards } from "../../../store/collection/browse/types";

// transform api data to show total cards in collection aggregated by year
export function aggregateCardsByYear(cardsBySet: SetCards[]): Array<{
  year: number;
  distinctCards: number;
  totalCards: number;
}> {
  const yearHash = cardsBySet.reduce((totals: any, set) => {
    const setYear = set.year;
    if (totals[setYear]) {
      return {
        ...totals,
        [setYear]: {
          totalCards: +totals[setYear].totalCards + +set.totalCards,
          distinctCards: +totals[setYear].distinctCards + +set.distinctCards,
        },
      };
    } else {
      return {
        ...totals,
        [String(setYear)]: {
          totalCards: +set.totalCards,
          distinctCards: +set.distinctCards,
        },
      };
    }
  }, {});

  const cardsByYear = Object.keys(yearHash)
    .map((year) => {
      return {
        year: +year,
        totalCards: yearHash[year].totalCards,
        distinctCards: yearHash[year].distinctCards,
      };
    })
    .sort((yearA, yearB) => yearB.year - yearA.year);

  return cardsByYear;
}
