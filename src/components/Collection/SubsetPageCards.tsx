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
    (state: RootState) => state.library.subsets.subset
  );
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset.cards
  );

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
            let series = librarySubset.series.find(
              (series) => series.id === card.card.seriesId
            )!;
            let libCard = librarySubset.card_data.find(
              (libraryCard) => libraryCard.id === card.card.id
            )!;

            return (
              <PlayerCard
                key={libCard.id}
                cardData={libCard}
                seriesData={series}
                quantity={1}
                serialNumber={null}
                grade={null}
                gradingCompany={null}
                value={null}
              />
            );
          })}
      </>
    );
  }

  if (props.showAllCards) {
    return (
      <>
        <div>showing all cards in this series...</div>
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
            return (
              <PlayerCard
                key={userCard.id}
                cardData={userCard.card.card_datum}
                seriesData={
                  librarySubset.series.find(
                    (series) => series.id === userCard.card.seriesId
                  )!
                }
                quantity={1}
                // seriesData: Series;
                serialNumber={userCard.serialNumber}
                grade={userCard.grade}
                gradingCompany={
                  userCard.grading_company
                    ? userCard.grading_company.name
                    : null
                }
                value={userCard.card.value}
              />
            );
          })}
      </>
    );
  }
}
