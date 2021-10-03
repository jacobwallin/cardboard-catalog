import { Filters } from "./filters";
import { UserCard } from "../../../store/collection/filter/types";

export function filterCards(cards: UserCard[], filters: Filters): UserCard[] {
  let filteredCards = cards;

  console.log("IS MEMOIZATION WORKING????!!!?!", filters);

  //TODO: change this to do only one filter function with if blocks inside for each filter condition???

  // YEAR
  if (filters.year.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.subset.set.year === filters.year.value
    );
  }
  // SET
  if (filters.setId.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.subset.set.id === filters.setId.value
    );
  }
  // SUBSET
  if (filters.subsetId.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.subset.id === filters.subsetId.value
    );
  }
  // SERIES
  if (filters.seriesId.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.id === filters.seriesId.value
    );
  }
  // TEAM
  if (filters.teamId.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.card_datum.teamId === filters.teamId.value
    );
  }
  // PLAYER
  if (filters.teamId.filter) {
    filteredCards = filteredCards.filter((card) => {
      // check if the selected player belongs to the card (some returns false if array is empty)
      return card.card.card_datum.players.some(
        (player) => player.id === filters.playerId.value
      );
    });
  }
  // SERIALIZED
  if (filters.serialized.filter) {
    filteredCards = filteredCards.filter((card) => card.card.series.serialized);
  }
  // ROOKIE
  if (filters.rookie.filter) {
    filteredCards = filteredCards.filter((card) => card.card.card_datum.rookie);
  }
  // AUTO
  if (filters.auto.filter) {
    filteredCards = filteredCards.filter((card) => card.card.series.auto);
  }
  // RELIC
  if (filters.relic.filter) {
    filteredCards = filteredCards.filter((card) => card.card.series.relic);
  }
  // MANUFACTURED RELIC
  if (filters.manufacturedRelic.filter) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.manufacturedRelic
    );
  }
  // PARALLEL
  if (filters.parallel.filter) {
    filteredCards = filteredCards.filter((card) => card.card.series.parallel);
  }
  // SHORT PRINT
  if (filters.shortPrint.filter) {
    filteredCards = filteredCards.filter((card) => card.card.series.shortPrint);
  }

  return filteredCards;
}
