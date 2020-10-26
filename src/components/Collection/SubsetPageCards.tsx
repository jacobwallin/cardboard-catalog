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
    (state: RootState) => state.collection.cardsInSingleSubset.cards
  );

  const selectedSeries = librarySubset.series.find(
    (series) => series.id === props.selectedSeriesId
  )!;

  if (props.selectedSeriesId === 0) {
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
            console.log("SERIES INDEX", seriesIdx);
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

  if (props.showAllCards) {
    return (
      <>
        {selectedSeries.cards.map((card) => {
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
        })}
      </>
    );
  } else {
    return (
      <>
        {subsetUserCards
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
}
