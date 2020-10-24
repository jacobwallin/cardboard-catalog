import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../store/collection/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import { SetCards } from "../../store/collection/types";
import { RootState } from "../../store";

import YearCard from "./YearCard";

import "../../styling/collection.css";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const CardsByYearPage = () => {
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.cardsBySet
  );

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.initialDataLoadComplete
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch data once
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  return (
    <div id="year-card-container">
      {isLoading ? (
        <p>Loading Collection</p>
      ) : cardsBySet.length === 0 ? (
        <h2>No Cards In Collection</h2>
      ) : (
        aggregateCardsByYear(cardsBySet).map((yearData) => {
          return <YearCard key={yearData.year} yearData={yearData} />;
        })
      )}
    </div>
  );
};

export default CardsByYearPage;

// transform api data to show total cards in collection aggregated by year
function aggregateCardsByYear(
  cardsBySet: SetCards[]
): Array<{
  year: number;
  distinctCards: number;
  totalCards: number;
}> {
  return cardsBySet.reduce(
    (
      cardsByYear: Array<{
        year: number;
        distinctCards: number;
        totalCards: number;
      }>,
      set
    ) => {
      if (
        cardsByYear.length > 0 &&
        cardsByYear[cardsByYear.length - 1].year === set.year
      ) {
        cardsByYear[cardsByYear.length - 1].distinctCards += +set.distinctCards;
        cardsByYear[cardsByYear.length - 1].totalCards += +set.totalCards;
      } else {
        cardsByYear.push({
          year: set.year,
          distinctCards: +set.distinctCards,
          totalCards: +set.totalCards,
        });
      }
      return cardsByYear;
    },
    []
  );
}
