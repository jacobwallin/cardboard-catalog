import { SetCards } from "../../../store/collection/browse/types";
import { League } from "../../../store/library/leagues/types";

export interface CollectionYears {
  year: number;
  distinctCards: number;
  totalCards: number;
}

// transform api data to show total cards in collection aggregated by year
export function aggregateCollectionByYear(
  cardsBySet: SetCards[],
  sportId: number
): CollectionYears[] {
  const yearHash = cardsBySet
    .filter((set) => set.leagueId === sportId)
    .reduce((totals: any, set) => {
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

export interface CollectionSports {
  sport: string;
  distinctCards: number;
  totalCards: number;
}

// transform api data to show total cards in collection aggregated by year
export function aggregateCollectionBySport(
  cardsBySet: SetCards[],
  sports: League[]
): CollectionSports[] {
  const sportsHash = cardsBySet.reduce((totals: any, set) => {
    const sportId = set.leagueId;
    if (totals[sportId]) {
      return {
        ...totals,
        [sportId]: {
          totalCards: +totals[sportId].totalCards + +set.totalCards,
          distinctCards: +totals[sportId].distinctCards + +set.distinctCards,
        },
      };
    } else {
      return {
        ...totals,
        [String(sportId)]: {
          totalCards: +set.totalCards,
          distinctCards: +set.distinctCards,
        },
      };
    }
  }, {});

  const collectionBySport = Object.keys(sportsHash)
    .filter((sportId) => sports.some((s) => s.id === +sportId))
    .map((sportId) => {
      const sport = sports.find((s) => s.id === +sportId)!;
      return {
        sport: sport.name,
        totalCards: sportsHash[sportId].totalCards,
        distinctCards: sportsHash[sportId].distinctCards,
      };
    });

  return collectionBySport;
}
