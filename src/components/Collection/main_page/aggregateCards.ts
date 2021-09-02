import { SetCards } from "../../../store/collection/types";

// transform api data to show total cards in collection aggregated by year
export function aggregateCardsByYear(cardsBySet: SetCards[]): Array<{
  year: number;
  distinctCards: number;
  totalCards: number;
}> {
  return cardsBySet.reduce(
    (
      cardsByYear: Array<{
        year: number;
        distinctCards: number;
        totalCards: number;
      }>,
      set
    ) => {
      if (
        cardsByYear.length > 0 &&
        cardsByYear[cardsByYear.length - 1].year === set.year
      ) {
        cardsByYear[cardsByYear.length - 1].distinctCards += +set.distinctCards;
        cardsByYear[cardsByYear.length - 1].totalCards += +set.totalCards;
      } else {
        cardsByYear.push({
          year: set.year,
          distinctCards: +set.distinctCards,
          totalCards: +set.totalCards,
        });
      }
      return cardsByYear;
    },
    []
  );
}
