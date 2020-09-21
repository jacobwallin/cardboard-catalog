import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchSets } from "../store/collection/thunks";
import { Subset } from "../store/collection/types";

import "../styling/collection.css";

import YearCard from "./YearCard";

import { RootState } from "../store";

const CollectionYears = (props: Props) => {
  useEffect(() => {
    if (props.subsets.length === 0) {
      props.getSets();
    }
  }, []);

  // format data
  function formatData(): Array<{
    year: number;
    distinctCards: number;
    totalCards: number;
  }> {
    return props.subsets.reduce((cardsByYear: any, subset) => {
      if (
        cardsByYear.length > 0 &&
        cardsByYear[cardsByYear.length - 1].year === subset.setYear
      ) {
        cardsByYear[
          cardsByYear.length - 1
        ].distinctCards += +subset.distinctCards;
        cardsByYear[cardsByYear.length - 1].totalCards += +subset.totalCards;
      } else {
        cardsByYear.push({
          year: subset.setYear,
          distinctCards: +subset.distinctCards,
          totalCards: +subset.totalCards,
        });
      }
      return cardsByYear;
    }, []);
  }

  return (
    <div id="year-card-container">
      {props.subsets.length !== 0 ? (
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
    subsets: state.collection.subsets,
  };
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getSets: () => dispatch(fetchSets()),
  };
};

export default connect(mapState, mapDispatch)(CollectionYears);

interface StateProps {
  subsets: Subset[];
}

interface DispatchProps {
  getSets: () => void;
}

type Props = StateProps & DispatchProps;
