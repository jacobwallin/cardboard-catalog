import {
  SubsetState,
  CardData,
  Series,
} from "../../../store/library/subsets/types";
import { UserCard } from "../../../store/collection/browse/types";
import sortCardNumbers from "../../../utils/sortCardNumbers";

export interface TableDataPoint {
  id: number;
  cardDataId: number;
  value: number;
  seriesId: number;
  quantity: number;
  cardData: CardData;
  series: Series;
}

export interface SeriesTableData {
  seriesId: number;
  totalCards: number;
  distinctCards: number;
  cards: TableDataPoint[];
}

export function createTableData(
  librarySubsetData: SubsetState,
  userCardData: { cards: UserCard[]; subsetId: number }
): SeriesTableData[] {
  // create hash table with the id and quantity of each card user has in collection

  interface UserCardTotals {
    [details: number]: number;
  }
  const userCardsTotals = userCardData.cards.reduce(
    (cardTotals: UserCardTotals, card) => {
      if (cardTotals[card.cardId]) {
        return { ...cardTotals, [card.cardId]: cardTotals[card.cardId] + 1 };
      } else {
        return { ...cardTotals, [card.cardId]: 1 };
      }
    },
    {}
  );

  // create hash table of card data to allow 0(1) lookup to match with each card in series
  interface CardDataHashTable {
    [details: string]: CardData;
  }
  const cardDataHashTable: CardDataHashTable =
    librarySubsetData.card_data.reduce((hashTable, cardData) => {
      return { ...hashTable, [cardData.id]: cardData };
    }, {});

  const newTableData: SeriesTableData[] = librarySubsetData.series.map(
    (series) => {
      const ser: SeriesTableData = {
        seriesId: series.id,
        totalCards: 0,
        distinctCards: 0,
        cards: [],
      };

      ser.cards = series.cards
        .map((card) => {
          const cardTotal = userCardsTotals[card.id]
            ? userCardsTotals[card.id]
            : 0;
          ser.totalCards += cardTotal;
          ser.distinctCards += cardTotal > 0 ? 1 : 0;
          return {
            ...card,
            quantity: cardTotal,
            cardData: cardDataHashTable[card.cardDataId],
            series: series,
          };
        })
        .sort((cardA, cardB) => {
          return sortCardNumbers(cardA.cardData.number, cardB.cardData.number);
        });

      return ser;
    }
  );

  return newTableData;
}

export interface DeleteTableDataPoint {
  id: number;
  serialNumber: number | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  cardId: number;
  gradingCompanyId: number | null;
  grade: number | null;
  card: {
    id: number;
    value: number | null;
    cardDataId: number;
    seriesId: number;
    cardData: CardData;
    series: Series;
  };
}

export function createUserCardTableData(
  checklist: TableDataPoint[],
  userCardData: { cards: UserCard[]; subsetId: number }
): DeleteTableDataPoint[] {
  // use table data generated by createTableData() to get card data for each card in user's collection
  return userCardData.cards.map((userCard) => {
    const card = checklist.find((card) => card.id === userCard.cardId)!;
    return {
      ...userCard,
      card: {
        ...card,
      },
    };
  });
}

export default createTableData;
