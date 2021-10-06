import { Filters } from "./types";
import { UserCard } from "../../../store/collection/filter/types";

export function filterCards(cards: UserCard[], filters: Filters): UserCard[] {
  let filteredCards = cards;

  // YEAR
  if (filters.year !== 0) {
    filteredCards = filteredCards.filter(
      (card) =>
        +card.card.series.subset.set.release_date.slice(0, 4) === filters.year
    );
  }
  // SET
  if (filters.setId !== 0) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.subset.set.id === filters.setId
    );
  }
  // SUBSET
  if (filters.subsetId !== 0) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.subset.id === filters.subsetId
    );
  }
  // SERIES
  if (filters.seriesId !== 0) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.id === filters.seriesId
    );
  }
  // TEAM
  if (filters.teamId !== 0) {
    filteredCards = filteredCards.filter(
      (card) => card.card.card_datum.teamId === filters.teamId
    );
  }
  // PLAYER
  if (filters.playerId !== 0) {
    filteredCards = filteredCards.filter((card) => {
      // check if the selected player belongs to the card (some returns false if array is empty)
      return card.card.card_datum.players.some(
        (player) => player.id === filters.playerId
      );
    });
  }
  // SERIALIZED
  if (filters.serialized) {
    filteredCards = filteredCards.filter((card) => card.card.series.serialized);
  }
  // ROOKIE
  if (filters.rookie) {
    filteredCards = filteredCards.filter((card) => card.card.card_datum.rookie);
  }
  // AUTO
  if (filters.auto) {
    filteredCards = filteredCards.filter((card) => card.card.series.auto);
  }
  // RELIC
  if (filters.relic) {
    filteredCards = filteredCards.filter((card) => card.card.series.relic);
  }
  // MANUFACTURED RELIC
  if (filters.manufacturedRelic) {
    filteredCards = filteredCards.filter(
      (card) => card.card.series.manufacturedRelic
    );
  }
  // PARALLEL
  if (filters.parallel) {
    filteredCards = filteredCards.filter((card) => card.card.series.parallel);
  }
  // SHORT PRINT
  if (filters.shortPrint) {
    filteredCards = filteredCards.filter((card) => card.card.series.shortPrint);
  }

  return filteredCards;
}
