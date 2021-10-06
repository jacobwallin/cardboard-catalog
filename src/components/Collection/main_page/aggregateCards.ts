import { SetCards } from "../../../store/collection/browse/types";

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
        cardsByYear[cardsByYear.length - 1].year ===
          +set.release_date.slice(0, 4)
      ) {
        cardsByYear[cardsByYear.length - 1].distinctCards += +set.distinctCards;
        cardsByYear[cardsByYear.length - 1].totalCards += +set.totalCards;
      } else {
        cardsByYear.push({
          year: +set.release_date.slice(0, 4),
          distinctCards: +set.distinctCards,
          totalCards: +set.totalCards,
        });
      }
      return cardsByYear;
    },
    []
  );
}
