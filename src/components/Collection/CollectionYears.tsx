import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchCardsBySet } from "../../store/collection/thunks";
import { SetCards } from "../../store/collection/types";

import "../../styling/collection.css";

import YearCard from "./YearCard";

import { RootState } from "../../store";

const CollectionYears = (props: Props) => {
  useEffect(() => {
    if (props.cardsBySet.length === 0) {
      props.getCardsBySet();
    }
  }, []);

  // format data
  function formatData(): Array<{
    year: number;
    distinctCards: number;
    totalCards: number;
  }> {
    return props.cardsBySet.reduce(
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
          cardsByYear[
            cardsByYear.length - 1
          ].distinctCards += +set.distinctCards;
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

  return (
    <div id="year-card-container">
      {props.cardsBySet.length !== 0 ? (
        formatData().map((yearData) => {
          return <YearCard key={yearData.year} yearData={yearData} />;
        })
      ) : (
        <p>Loading Collection</p>
      )}
    </div>
  );
};

const mapState = (state: RootState): StateProps => {
  return {
    cardsBySet: state.collection.cardsBySet,
  };
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getCardsBySet: () => dispatch(fetchCardsBySet()),
  };
};

export default connect(mapState, mapDispatch)(CollectionYears);

interface StateProps {
  cardsBySet: SetCards[];
}

interface DispatchProps {
  getCardsBySet: () => void;
}

type Props = StateProps & DispatchProps;
