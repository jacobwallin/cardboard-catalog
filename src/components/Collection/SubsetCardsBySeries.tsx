import React from "react";
import { useSelector } from "react-redux";
import PlayerCard from "../PlayerCard";
import { RootState } from "../../store";

interface Props {
  showAllCards: boolean;
  selectedSeriesId: number;
}

export default function SubsetCardsBySeries(props: Props) {
  const librarySubset = useSelector(
    (state: RootState) => state.library.subsets.singleSubset
  );
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset
  );

  const selectedSeries = librarySubset.series.find(
    (series) => series.id === props.selectedSeriesId
  )!;

  // show either all cards in the library for the selected series, or only the cards that are in the user's collection
  return (
    <>
      {props.showAllCards
        ? selectedSeries.cards.map((card) => {
            const userCard = subsetUserCards.find((userCard) => {
              return userCard.card.id === card.id;
            });

            const cardQty = userCard !== undefined ? userCard.quantity : 0;

            return (
              <PlayerCard
                key={card.id}
                card={card}
                quantity={cardQty}
                color={selectedSeries.color}
              />
            );
          })
        : subsetUserCards
            .filter(
              (userCard) => userCard.card.seriesId === props.selectedSeriesId
            )
            .map((userCard) => {
              const libraryCard = selectedSeries.cards.find(
                (card) => card.id === userCard.card.id
              )!;

              return (
                <PlayerCard
                  key={libraryCard.id}
                  card={libraryCard}
                  quantity={userCard.quantity}
                  color={selectedSeries.color}
                />
              );
            })}
    </>
  );
}
