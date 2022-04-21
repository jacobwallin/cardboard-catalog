import {
  Subset,
  CardData,
  SubsetSeries,
} from "../../../store/library/subsets/types";
import { UserCard } from "../../../store/collection/browse/types";
import sortCardNumbers from "../../../utils/sortCardNumbers";

export interface TableDataPoint {
  id: number;
  cardDataId: number;
  serializedTo: number | null;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  shortPrint: boolean;
  seriesId: number;
  quantity: number;
  cardData: CardData;
  series: SubsetSeries;
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
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  shortPrint: boolean;
  card: {
    id: number;
    cardDataId: number;
    serializedTo: number | null;
    seriesId: number;
    cardData: CardData;
    series: SubsetSeries;
  };
}
export interface SeriesTableData {
  seriesId: number;
  series: SubsetSeries;
  totalCards: number;
  distinctCards: number;
  cards: TableDataPoint[];
  userCards: DeleteTableDataPoint[];
}

export interface TableData {
  [key: number]: SeriesTableData;
}

export function createTableData(
  librarySubsetData: Subset,
  userCardData: { cards: UserCard[]; subsetId: number }
): TableData {
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

  // create hash table of card data for quick access
  interface CardDataHashTable {
    [details: string]: CardData;
  }
  const cardDataHashTable: CardDataHashTable =
    librarySubsetData.card_data.reduce((hashTable, cardData) => {
      return { ...hashTable, [cardData.id]: cardData };
    }, {});

  const newTableData = librarySubsetData.series.reduce(
    (tableData: TableData, series) => {
      const ser: SeriesTableData = {
        seriesId: series.id,
        series: series,
        totalCards: 0,
        distinctCards: 0,
        cards: [],
        userCards: [],
      };

      ser.userCards = userCardData.cards
        .filter((userCard) => userCard.card.seriesId === series.id)
        .map((userCard) => {
          return {
            ...userCard,
            auto: librarySubsetData.auto,
            relic: librarySubsetData.relic,
            manufacturedRelic: librarySubsetData.manufacturedRelic,
            shortPrint: librarySubsetData.shortPrint,
            card: {
              ...userCard.card,
              series: series,
              cardData: cardDataHashTable[userCard.card.cardDataId],
            },
          };
        })
        .sort((cardA, cardB) => {
          return sortCardNumbers(
            cardA.card.cardData.number,
            cardB.card.cardData.number
          );
        });

      ser.cards = series.cards
        .map((card) => {
          const cardTotal = userCardsTotals[card.id]
            ? userCardsTotals[card.id]
            : 0;
          ser.totalCards += cardTotal;
          ser.distinctCards += cardTotal > 0 ? 1 : 0;
          return {
            ...card,
            seriesId: series.id,
            auto: librarySubsetData.auto,
            relic: librarySubsetData.relic,
            manufacturedRelic: librarySubsetData.manufacturedRelic,
            shortPrint: librarySubsetData.shortPrint,
            quantity: cardTotal,
            cardData: cardDataHashTable[card.cardDataId],
            series: series,
          };
        })
        .sort((cardA, cardB) => {
          return sortCardNumbers(cardA.cardData.number, cardB.cardData.number);
        });

      tableData[series.id] = ser;
      return tableData;
    },
    {}
  );

  return newTableData;
}

export default createTableData;