import React from "react";
import { useSelector } from "react-redux";
import PlayerCard from "./PlayerCard";
import { RootState } from "../store";

export default function SubsetsAllUserCards() {
  const librarySubset = useSelector(
    (state: RootState) => state.library.singleSubset
  );
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset
  );

  // show all the cards that are in the user's collection for the entire subset
  return (
    <>
      {subsetUserCards
        .sort((a, b) => {
          // parse to int if possible, otherwise compare as strings
          const aInt =
            parseInt(a.card.card_datum.number) || a.card.card_datum.number;
          const bInt = parseInt(
            b.card.card_datum.number || b.card.card_datum.number
          );
          if (aInt < bInt) {
            return -1;
          } else if (aInt === bInt) {
            return 0;
          }
          return 1;
        })
        .map((card) => {
          let seriesIdx = librarySubset.series.findIndex(
            (series) => series.id === card.card.seriesId
          );
          let libCard = librarySubset.series[seriesIdx].cards.find(
            (libraryCard) => libraryCard.id === card.card.id
          )!;

          return (
            <PlayerCard
              key={libCard.id}
              card={libCard}
              quantity={card.quantity}
              color={librarySubset.series[seriesIdx].color}
            />
          );
        })}
    </>
  );
}
