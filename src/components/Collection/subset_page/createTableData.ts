import { Subset, CardData } from "../../../store/library/subsets/types";
import { UserCard } from "../../../store/collection/types";

interface ReturnValue {
  id: number;
  cardDataId: number;
  value: number;
  seriesId: number;
  quantity: number;
  cardData: CardData;
}

function createTableData(
  librarySubsetData: Subset,
  userCardData: { cards: UserCard[]; subsetId: number }
): ReturnValue[] {
  // create hash table with the total quantity of each card user has in collection
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
    (allCards: ReturnValue[], series) => {
      const cardDataArray = series.cards.map((card) => {
        return {
          ...card,
          cardData: cardDataHashTable[card.cardDataId],
          quantity: userCardsTotals[card.id] ? userCardsTotals[card.id] : 0,
        };
      });
      return [...allCards, ...cardDataArray];
    },
    []
  );

  return allCardsTableData;
}

export default createTableData;
