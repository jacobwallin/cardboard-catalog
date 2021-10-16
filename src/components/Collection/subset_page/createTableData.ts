import { Subset, CardData, Series } from "../../../store/library/subsets/types";
import { UserCard } from "../../../store/collection/browse/types";

export interface TableDataPoint {
  id: number;
  cardDataId: number;
  value: number;
  seriesId: number;
  quantity: number;
  cardData: CardData;
  series: Series;
}

export function createTableData(
  librarySubsetData: Subset,
  userCardData: { cards: UserCard[]; subsetId: number }
): TableDataPoint[] {
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

  // allow 0(1) lookup into card data to create array for DataTable
  interface CardDataHashTable {
    [details: string]: CardData;
  }
  const cardDataHashTable: CardDataHashTable =
    librarySubsetData.card_data.reduce((hashTable, cardData) => {
      return { ...hashTable, [cardData.id]: cardData };
    }, {});

  // create the actual data array for the DataTable
  const allCardsTableData = librarySubsetData.series.reduce(
    (allCards: TableDataPoint[], series) => {
      const cardDataArray = series.cards.map((card) => {
        return {
          ...card,
          quantity: userCardsTotals[card.id] ? userCardsTotals[card.id] : 0,
          cardData: cardDataHashTable[card.cardDataId],
          series: series,
        };
      });
      return [...allCards, ...cardDataArray];
    },
    []
  );
  return allCardsTableData;
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
  librarySubsetData: Subset,
  userCardData: { cards: UserCard[]; subsetId: number }
): DeleteTableDataPoint[] {
  // create hash table with the id and quantity of each card user has in collection

  return userCardData.cards.map((userCard) => {
    const series = librarySubsetData.series.find(
      (series) => series.id === userCard.card.seriesId
    )!;

    const cardData = librarySubsetData.card_data.find(
      (cardData) => cardData.id === userCard.card.cardDataId
    )!;

    return {
      ...userCard,
      card: {
        ...userCard.card,
        series,
        cardData,
      },
    };
  });
}

export default createTableData;
