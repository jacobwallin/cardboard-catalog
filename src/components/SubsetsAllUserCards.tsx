import React from "react";
import { useSelector } from "react-redux";
import PlayerCard from "./PlayerCard";
import { RootState } from "../store";

export default function SubsetsAllUserCards() {
  const librarySubset = useSelector((state: RootState) => state.library.subset);
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.singleSubset
  );

  // show all the cards that are in the user's collection for the entire subset
  return (
    <>
      {subsetUserCards.map((card) => {
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
